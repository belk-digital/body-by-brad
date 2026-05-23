-- Seed the two real merch items: one mens, one womens.
-- The image URL is a placeholder reusing the existing hoodie shot — edit via /admin/products
-- once final product photography is uploaded.

insert into public.products (name, description, price_cents, original_price_cents, image, stock, category)
values
  (
    'BBB Hoodie — Mens',
    'Heavyweight cotton-blend hoodie in the signature Body By Brad fit. Built for training, made for everyday.',
    8900,
    12900,
    'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
    25,
    'mens'
  ),
  (
    'BBB Hoodie — Womens',
    'Tailored women''s cut with the same heavyweight feel. Designed to move with you in the gym and out.',
    8900,
    12900,
    'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
    25,
    'womens'
  );
