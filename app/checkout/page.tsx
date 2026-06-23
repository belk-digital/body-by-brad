'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useCart } from '@/lib/cart/CartContext';
import { useAuth } from '@/lib/auth/AuthContext';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

const STATE_NAMES: Record<string, string> = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',
  CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',
  KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',
  MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',
  MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',
  NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',
  OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',
  SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
  VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',
  DC:'Washington DC',
};

function CheckoutForm() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefilled, setPrefilled] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: 'United States',
    state: '',
    city: '',
    address: '',
    zip: '',
    agreeData: false,
    delivery: 'standard' as 'standard' | 'express',
    agreeTerms: false,
  });

  useEffect(() => {
    if (user && !prefilled) {
      const meta = user.user_metadata ?? {};
      setForm((f) => ({
        ...f,
        firstName: meta.first_name ?? meta.full_name?.split(' ')[0] ?? f.firstName,
        lastName: meta.last_name ?? meta.full_name?.split(' ').slice(1).join(' ') ?? f.lastName,
        email: user.email ?? f.email,
        phone: meta.phone ?? f.phone,
      }));
      setPrefilled(true);
    }
  }, [user, prefilled]);

  const shippingCost = form.delivery === 'express' ? 15 : 0;
  const total = subtotal + shippingCost;

  function update(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePay() {
    if (!form.firstName || !form.email) {
      setError('Please fill in your name and email.');
      return;
    }
    if (!form.address || !form.city || !form.state || !form.zip) {
      setError('Please fill in your complete shipping address.');
      return;
    }
    if (!form.agreeTerms) {
      setError('Please agree to the terms to continue.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          userId: user?.id ?? null,
          customerEmail: form.email,
          shippingAddress: {
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
          },
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="w-full bg-white py-20 px-4 sm:px-7 md:px-12">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-zinc-950 mb-4">
            Your cart is empty
          </h2>
          <p className="text-zinc-500 text-sm mb-8">
            Add some items before checking out.
          </p>
          <Link
            href="/merchandise"
            className="inline-flex items-center gap-2 bg-zinc-950 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-black transition-colors"
          >
            Browse Merchandise
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-7 md:px-12">
        {/* Page heading */}
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 mb-10">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* ───── Left column — Form ───── */}
          <div className="flex-1 min-w-0">
            {/* Information */}
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-950">Information</h2>
              {user ? (
                <span className="text-xs text-zinc-400">
                  Signed in as <span className="font-medium text-zinc-600">{user.email}</span>
                </span>
              ) : (
                <Link href="/sign-in?next=/checkout" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
                  Already have an account? <span className="underline">Log in</span>
                </Link>
              )}
            </div>

            {/* Personal Information */}
            <p className="text-sm font-semibold text-zinc-700 mb-3">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                className="w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                className="w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {/* Shipping Information */}
            <p className="text-sm font-semibold text-zinc-700 mb-3">Shipping Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="w-full border-0 border-b border-zinc-200 py-3 text-sm text-zinc-400">
                United States
              </div>
              <select
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                className={`w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm outline-none focus:border-zinc-900 transition-colors appearance-none cursor-pointer ${
                  form.state ? 'text-zinc-900' : 'text-zinc-400'
                }`}
              >
                <option value="" disabled>State</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{STATE_NAMES[s]}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                className="w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
              />
              <input
                type="text"
                placeholder="Zip / Postal code"
                value={form.zip}
                onChange={(e) => update('zip', e.target.value)}
                className="w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 mb-4">
              <input
                type="text"
                placeholder="Street address"
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                className="w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            <label className="flex items-center gap-2 mb-10 cursor-pointer text-xs text-zinc-500">
              <input
                type="checkbox"
                checked={form.agreeData}
                onChange={(e) => update('agreeData', e.target.checked)}
                className="w-4 h-4 accent-zinc-900"
              />
              I agree to data processing
            </label>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-100 mb-8" />

            {/* Delivery */}
            <h2 className="text-xl font-bold text-zinc-950 mb-5">Delivery</h2>

            <label
              className={`flex items-center justify-between p-4 border cursor-pointer mb-3 transition-colors ${
                form.delivery === 'standard' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === 'standard'}
                  onChange={() => update('delivery', 'standard')}
                  className="w-4 h-4 accent-zinc-900"
                />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Standard Delivery</p>
                  <p className="text-xs text-zinc-400">Delivery within 5–7 days</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-zinc-900">Free</span>
            </label>

            <label
              className={`flex items-center justify-between p-4 border cursor-pointer mb-10 transition-colors ${
                form.delivery === 'express' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === 'express'}
                  onChange={() => update('delivery', 'express')}
                  className="w-4 h-4 accent-zinc-900"
                />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Express Shipping</p>
                  <p className="text-xs text-zinc-400">Delivery within 1–3 days</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-zinc-900">$15.00</span>
            </label>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-100 mb-8" />

            {/* Payment info */}
            <h2 className="text-xl font-bold text-zinc-950 mb-2">Payment</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Payment is processed securely through Stripe on the next page.
            </p>

            <div className="flex items-center gap-4 p-4 border border-zinc-200 bg-zinc-50 mb-6">
              <svg className="w-5 h-5 text-zinc-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-zinc-700">Secure Stripe Checkout</p>
                <p className="text-xs text-zinc-400">Credit card, Apple Pay, Google Pay accepted</p>
              </div>
            </div>

            <label className="flex items-center gap-2 mb-6 cursor-pointer text-xs text-zinc-500">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={(e) => update('agreeTerms', e.target.checked)}
                className="w-4 h-4 accent-zinc-900"
              />
              I agree to the{' '}
              <Link href="/terms" className="underline hover:text-zinc-700">
                terms and conditions
              </Link>
            </label>

            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full bg-zinc-950 text-white py-4 text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirecting to payment…' : 'Pay and Place Order'}
            </button>
          </div>

          {/* ───── Right column — Shopping Bag ───── */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <h2 className="text-xl font-bold text-zinc-950 mb-6">
                Shopping Bag ({totalQty})
              </h2>

              {/* Items */}
              <div className="space-y-5 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[90px] h-[110px] object-cover bg-zinc-100 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0 flex justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-zinc-950 mb-2">{item.name}</h3>
                        <div className="space-y-0.5 text-xs text-zinc-500">
                          {item.size && (
                            <p>
                              <span className="text-zinc-400">Size:</span>{' '}
                              <span className="font-medium text-zinc-700">{item.size}</span>
                            </p>
                          )}
                          <p>
                            <span className="text-zinc-400">Qty:</span>{' '}
                            <span className="font-medium text-zinc-700">{item.quantity}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-zinc-400 hover:text-zinc-900 text-xs underline transition-colors"
                          >
                            −
                          </button>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-zinc-400 hover:text-zinc-900 text-xs underline transition-colors"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-zinc-400 hover:text-red-500 text-xs underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-zinc-950 flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-zinc-200 mb-5" />

              {/* Promo code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 border border-zinc-200 rounded-none px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 transition-colors"
                />
                <button className="px-5 py-3 border-0 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="text-zinc-900">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Discount</span>
                  <span className="text-zinc-900">$0.00</span>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-200 mb-4" />

              <div className="flex justify-between items-baseline">
                <span className="text-base font-bold text-zinc-950">Total:</span>
                <span className="text-2xl font-black text-zinc-950">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

function CheckoutContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const up = latest < prevScrollY.current;
    prevScrollY.current = latest;
    if (latest > 100 && up) setIsScrolled(true);
    else if (!up || latest <= 100) setIsScrolled(false);
  });

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden font-satoshi">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* Navbar */}
      <div className="relative w-full bg-white" style={{ height: 80 }}>
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
          theme="dark"
        />
      </div>

      <CheckoutForm />
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ReactLenis root>
      <CheckoutContent />
    </ReactLenis>
  );
}
