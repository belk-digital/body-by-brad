/**
 * Returns `path` only if it is a safe same-origin relative path.
 * Prevents open-redirect attacks where `next` could be crafted as
 * `https://evil.com` or `//evil.com` (protocol-relative).
 */
export function safeRedirect(path: string | null | undefined, fallback = '/account'): string {
  if (!path) return fallback;
  // Must start with exactly one "/" and not be a protocol-relative URL (//)
  if (path.startsWith('/') && !path.startsWith('//') && !path.includes(':')) {
    return path;
  }
  return fallback;
}
