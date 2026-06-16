'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '@/lib/cart/CartContext';

export default function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, clear, subtotal } = useCart();
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutError('Network error. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />
          <motion.div
            className="font-satoshi fixed right-0 top-0 h-full z-[80] w-full max-w-[400px] bg-white flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-zinc-100">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">Your Cart</h2>
                <p className="text-sm text-zinc-400 mt-0.5">
                  {totalQty} item{totalQty !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={close}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-zinc-400">
                  <IoCartOutline size={40} className="mb-3 opacity-30" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-3 p-3 rounded-xl border border-zinc-100 bg-zinc-50"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-zinc-900 truncate">
                            {item.name}
                          </div>
                          {item.size && (
                            <div className="text-[10px] uppercase tracking-widest text-zinc-400 mt-0.5">
                              Size {item.size}
                            </div>
                          )}
                        </div>
                        <span className="font-semibold text-sm text-zinc-950 flex-shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 border border-zinc-200 rounded-full px-2.5 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-zinc-500 hover:text-zinc-900 w-4 h-4 flex items-center justify-center text-base leading-none"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium w-4 text-center text-zinc-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-zinc-500 hover:text-zinc-900 w-4 h-4 flex items-center justify-center text-base leading-none"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-zinc-400 underline hover:text-zinc-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-zinc-100 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-500 text-sm">Subtotal</span>
                  <span className="font-semibold text-zinc-950">${subtotal.toFixed(2)}</span>
                </div>
                {checkoutError && (
                  <p className="text-xs text-red-500 mb-3 text-center">{checkoutError}</p>
                )}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-[#007AE5] text-white py-4 rounded-full font-semibold text-sm hover:bg-[#2d6bc4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? 'Redirecting…' : 'Checkout'}
                </button>
                <button
                  onClick={clear}
                  className="w-full text-center text-xs text-zinc-400 underline mt-3 hover:text-zinc-600 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
