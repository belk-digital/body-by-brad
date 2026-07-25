import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from '@/lib/cart/CartContext';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import CartDrawer from '@/components/layout/CartDrawer';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site';
import { logoUrl } from '@/lib/constants';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Body By Brad | Top Personal Trainer in Charleston, SC',
  description: "Charleston's top-rated personal trainer. 1-on-1 coaching, group fitness classes, and online programs built around your goals. ISSA certified. Real results. Book your free call today.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Body By Brad | Top Personal Trainer in Charleston, SC',
    description: "Charleston's top-rated personal trainer. 1-on-1 coaching, group fitness classes, and online programs built around your goals. ISSA certified. Real results.",
    url: '/',
    type: 'website',
    siteName: 'Body By Brad',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body By Brad | Top Personal Trainer in Charleston, SC',
    description: "Charleston's top-rated personal trainer. 1-on-1 coaching, group fitness classes, and online programs built around your goals.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
  icons: { icon: logoUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,c_crop,g_north_west,h_768,w_1279/Gemini_Generated_Image_t0sivbt0sivbt0si_iwqxhp.png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1778894870/Untitled_flr1cs.png"
          fetchPriority="high"
        />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
