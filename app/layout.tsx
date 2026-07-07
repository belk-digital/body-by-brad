import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart/CartContext';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  title: 'Body By Brad | Personal Trainer in Charleston, SC',
  description: "Charleston's elite personal trainer. 1-on-1 coaching, group fitness classes, and online programs built around your goals. ISSA certified. Real results. Book your free call today.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Body By Brad | Personal Trainer in Charleston, SC',
    description: "Charleston's elite personal trainer. 1-on-1 coaching, group fitness classes, and online programs built around your goals. ISSA certified. Real results.",
    url: '/',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,c_crop,g_north_west,h_768,w_1279/Gemini_Generated_Image_t0sivbt0sivbt0si_iwqxhp.png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1778894870/Untitled_flr1cs.png"
          fetchPriority="high"
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
