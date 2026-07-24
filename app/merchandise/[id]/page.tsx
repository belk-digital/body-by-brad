import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';
import { DEFAULT_OG_IMAGE } from '@/lib/site';
import MerchDetail from './MerchDetail';

export const dynamic = 'force-dynamic';

async function getProduct(id: string) {
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, name, description, price_cents, original_price_cents, image, stock, active, category')
    .eq('id', id)
    .eq('active', true)
    .maybeSingle<Product>();
  return product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: 'Product Not Found' };

  const title = `${product.name} | Body By Brad Merchandise`;
  const description =
    product.description ?? `Shop ${product.name} — premium fitness apparel from Body By Brad.`;

  return {
    title,
    description,
    alternates: { canonical: `/merchandise/${product.id}` },
    openGraph: {
      title,
      description,
      url: `/merchandise/${product.id}`,
      type: 'website',
      images: product.image ? [{ url: product.image }] : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image ?? DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? undefined,
    image: product.image ?? undefined,
    category: product.category ?? undefined,
    brand: { '@type': 'Brand', name: 'Body By Brad' },
    offers: {
      '@type': 'Offer',
      url: `https://www.bodybybradfitness.com/merchandise/${product.id}`,
      priceCurrency: 'USD',
      price: (product.price_cents / 100).toFixed(2),
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MerchDetail product={product} />
    </>
  );
}
