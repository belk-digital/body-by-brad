-- Body By Brad merch store — initial schema
-- Run this in Supabase Dashboard → SQL Editor, or via `supabase db push` if using the CLI.

-- ============================================================================
-- PRODUCTS
-- ============================================================================
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  description     text,
  price_cents     integer not null check (price_cents >= 0),
  original_price_cents integer check (original_price_cents >= 0),
  image           text,
  stripe_price_id text unique,
  stock           integer not null default 0 check (stock >= 0),
  active          boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_active_idx on public.products (active);

-- ============================================================================
-- ORDERS
-- ============================================================================
-- payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
-- fulfillment_status: 'unfulfilled' | 'shipped' | 'delivered' | 'cancelled'
create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  -- Clerk user id (text, not a UUID). Nullable to allow guest checkout.
  user_id            text,
  email              text not null,
  stripe_session_id  text unique,
  stripe_payment_intent_id text unique,
  payment_status     text not null default 'pending',
  fulfillment_status text not null default 'unfulfilled',
  subtotal_cents     integer not null check (subtotal_cents >= 0),
  shipping_cents     integer not null default 0 check (shipping_cents >= 0),
  total_cents        integer not null check (total_cents >= 0),
  shipping_address   jsonb,
  tracking_number    text,
  tracking_carrier   text,
  shipped_at         timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- ============================================================================
-- ORDER ITEMS
-- ============================================================================
create table if not exists public.order_items (
  id                     uuid primary key default gen_random_uuid(),
  order_id               uuid not null references public.orders(id) on delete cascade,
  product_id             uuid references public.products(id) on delete set null,
  name_snapshot          text not null,
  price_at_purchase_cents integer not null check (price_at_purchase_cents >= 0),
  quantity               integer not null check (quantity > 0),
  created_at             timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- ============================================================================
-- updated_at trigger
-- ============================================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_updated_at();

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
-- We use Clerk for auth, NOT Supabase Auth. So `auth.uid()` will be null in
-- requests made with the anon key. The pattern:
--
--   • Public reads of `products` (active only) via anon key — used by the storefront.
--   • Writes to products + all reads/writes of orders + order_items happen on the
--     server using the SERVICE ROLE key, which bypasses RLS. The server is
--     responsible for checking the Clerk userId before returning order data.
--
-- This is simpler than wiring Clerk JWTs into Supabase RLS and is the standard
-- pattern for Clerk + Supabase.

alter table public.products    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

-- Public can read active products (storefront)
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (active = true);

-- No anon policies for orders / order_items. Server uses service role.
-- (RLS is on but with no policies = locked down for anon/auth roles. Service role bypasses RLS entirely.)
