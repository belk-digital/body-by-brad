import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog-data';
import BlogPostDetail from './BlogPostDetail';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      images: [{ url: post.heroImage, width: 1600, height: 900, alt: post.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo.description,
    image: post.heroImage,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
      url: 'https://www.bodybybradfitness.com/about-brad',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Body By Brad',
      url: 'https://www.bodybybradfitness.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_200/v1779060049/Gemini_Generated_Image_xb9w0txb9w0txb9ww-removebg-preview_u9i0kp.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.bodybybradfitness.com/blog/${post.slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bodybybradfitness.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.bodybybradfitness.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.bodybybradfitness.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <BlogPostDetail post={post} />
    </>
  );
}
