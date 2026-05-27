import type { Metadata } from 'next';
import './globals.css';
import ScrollBar from '@/components/ui/ScrollBar';
import { CartProvider } from '@/lib/cart/CartContext';
import { AuthProvider } from '@/lib/auth/AuthContext';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  title: 'Body By Brad',
  description: 'Elite personal training, group fitness, and online coaching in Charleston, SC.',
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
        <AuthProvider>
          <CartProvider>
            <ScrollBar />
            {children}
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
