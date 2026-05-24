-- Switch user identity from Clerk (text user_id) to Supabase Auth (uuid -> auth.users)
-- and enable proper user-level RLS using auth.uid().
--
-- Safe to run now because no real orders exist yet.

-- ============================================================================
-- ORDERS: user_id -> uuid referencing auth.users
-- ============================================================================
alter table public.orders drop column if exists user_id;
alter table public.orders
  add column user_id uuid references auth.users(id) on delete set null;

create index if not exists orders_user_id_idx on public.orders (user_id);

-- ============================================================================
-- ORDERS RLS: signed-in users can read their own orders directly
-- ============================================================================
drop policy if exists "orders_owner_select" on public.orders;
create policy "orders_owner_select"
  on public.orders for select
  using (auth.uid() = user_id);

-- Service role bypasses RLS, so server-side admin reads still work.

-- ============================================================================
-- ORDER ITEMS RLS: owners can read items for their orders
-- ============================================================================
drop policy if exists "order_items_owner_select" on public.order_items;
create policy "order_items_owner_select"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.uid()
    )
  );
