'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart/CartContext';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clear } = useCart();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => {
        if (res.ok) {
          setStatus('success');
          clear();
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [sessionId, clear]);

  if (status === 'loading') {
    return (
      <main className="font-satoshi min-h-dvh bg-[#f5f4f3] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center animate-pulse">
            <svg
              className="w-9 h-9 text-zinc-400 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-950 mb-4">
            Confirming order…
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed">
            Please wait while we verify your payment.
          </p>
        </div>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="font-satoshi min-h-dvh bg-[#f5f4f3] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-9 h-9 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-950 mb-4">
            Something went wrong
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed mb-10">
            We couldn&apos;t verify your payment. If you were charged, please contact us and
            we&apos;ll sort it out.
          </p>
          <Link
            href="/merchandise"
            className="bg-zinc-950 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-black transition-colors"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="font-satoshi min-h-dvh bg-[#f5f4f3] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
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

export default function OrderConfirmedPage() {
  return (
    <Suspense
      fallback={
        <main className="font-satoshi min-h-dvh bg-[#f5f4f3] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-950 mb-4">
              Confirming order…
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed">
              Please wait while we verify your payment.
            </p>
          </div>
        </main>
      }
    >
      <OrderConfirmedContent />
    </Suspense>
  );
}
