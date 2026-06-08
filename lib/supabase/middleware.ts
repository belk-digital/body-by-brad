import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PREFIXES = ['/_next', '/api/webhooks', '/sign-in', '/sign-up', '/auth/callback', '/auth/confirm', '/favicon'];

const PROTECTED_PREFIXES = ['/account', '/admin', '/api/admin'];

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}

function isPublic(pathname: string) {
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  const h = response.headers;

  // Prevent clickjacking
  h.set('X-Frame-Options', 'DENY');

  // Prevent MIME-type sniffing
  h.set('X-Content-Type-Options', 'nosniff');

  // Limit referrer information sent to third parties
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict browser feature access
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  // Force HTTPS for 1 year (only effective over HTTPS — Vercel always uses HTTPS)
  h.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content Security Policy
  // - script-src: 'unsafe-inline' required for Next.js inline scripts
  // - connect-src: Supabase project + wss for realtime
  // - img-src: Cloudinary, Google user avatars, data URIs
  // - frame-src: Stripe payment iframes
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://images.unsplash.com https://placehold.co https://i.pravatar.cc",
    "media-src 'self' https://res.cloudinary.com",
    `connect-src 'self' https://${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')} wss://${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')} https://api.stripe.com`,
    "frame-src https://js.stripe.com https://hooks.stripe.com https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');
  h.set('Content-Security-Policy', csp);

  return response;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: per @supabase/ssr docs, call getUser() between createServerClient
  // and returning supabaseResponse so the session refresh happens server-side.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && isProtected(pathname) && !isPublic(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/sign-in';
    redirectUrl.searchParams.set('next', pathname);
    return applySecurityHeaders(NextResponse.redirect(redirectUrl));
  }

  return applySecurityHeaders(supabaseResponse);
}
