import 'server-only';
import { currentUser } from '@clerk/nextjs/server';

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
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress?.toLowerCase();
  return !!email && admins.has(email);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Response('Forbidden', { status: 403 });
  }
}
