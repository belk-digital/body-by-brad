'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Convenience singleton for non-component reads (e.g. data fetches in client effects).
// Auth-aware code should call createSupabaseBrowserClient() per usage to get a fresh handle.
export const supabaseBrowser = createSupabaseBrowserClient();
