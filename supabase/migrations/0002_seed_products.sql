-- Seed the products table with the existing merchItems from lib/constants.ts
-- The stripe_price_id is left null here — we'll fill it in after creating the
-- matching Stripe Products/Prices in Phase 3 (via a small script or by hand
-- in the Stripe dashboard).

insert into public.products (name, description, price_cents, original_price_cents, image, stock)
values
  (
    'Shadow Drip',
    'A sleek, minimalist hoodie with dark tones and subtle reflective accents for an effortless street vibe.',
    8900,
    12900,
    'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
    25
  ),
  (
    'Urban Phantom',
    'Urban Phantom – A bold, oversized hoodie with edgy graphics and a stealthy aesthetic inspired by city nights.',
    8900,
    12900,
    'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
    25
  ),
  (
    'Neon Rebellion',
    'A statement piece with vibrant neon details and rebellious street art influences for a standout look.',
    8900,
    12900,
    'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
    25
  );
