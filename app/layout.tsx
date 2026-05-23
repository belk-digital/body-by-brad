import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import ScrollBar from '@/components/ui/ScrollBar';
import { CartProvider } from '@/lib/cart/CartContext';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  title: 'Body By Brad',
  description: 'Elite personal training, group fitness, and online coaching in Charleston, SC.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
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
          <CartProvider>
            <ScrollBar />
            {children}
            <CartDrawer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
