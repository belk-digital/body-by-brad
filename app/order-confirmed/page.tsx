import Link from 'next/link';
import CartClearer from './CartClearer';

export default function OrderConfirmedPage() {
  return (
    <main className="font-satoshi min-h-dvh bg-[#f5f4f3] flex items-center justify-center px-4">
      <CartClearer />
      <div className="max-w-md w-full text-center">
        {/* Checkmark */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-[#CBFF00] flex items-center justify-center">
          <svg
            className="w-9 h-9 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-950 mb-4">
          Order confirmed
        </h1>
        <p className="text-zinc-500 text-base leading-relaxed mb-10">
          Thanks for your order! You&apos;ll receive a confirmation email shortly. Once your
          order ships we&apos;ll send you a tracking number.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/merchandise"
            className="bg-zinc-950 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-black transition-colors"
          >
            Keep shopping
          </Link>
          <Link
            href="/account"
            className="border border-zinc-300 text-zinc-700 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:border-zinc-600 hover:text-zinc-950 transition-colors"
          >
            View orders
          </Link>
        </div>
      </div>
    </main>
  );
}
