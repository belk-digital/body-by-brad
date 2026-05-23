-- Add category column to products. Free-form text (not a check constraint)
-- so future categories like 'accessories' can be added without another migration.

alter table public.products
  add column if not exists category text;

create index if not exists products_category_idx on public.products (category);
