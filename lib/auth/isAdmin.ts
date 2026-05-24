import 'server-only';
import { createSupabaseServerClient } from '@/lib/supabase/server';

function getAdminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function isAdmin(): Promise<boolean> {
  const admins = getAdminEmails();
  if (admins.size === 0) return false;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.toLowerCase();
  return !!email && admins.has(email);
}
