'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';

type OrderItem = {
  id: string;
  name_snapshot: string;
  price_at_purchase_cents: number;
  quantity: number;
};

type Order = {
  id: string;
  email: string;
  user_id: string | null;
  payment_status: string;
  fulfillment_status: string;
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  shipping_address: Record<string, unknown> | null;
  tracking_number: string | null;
  tracking_carrier: string | null;
  shipped_at: string | null;
  created_at: string;
  order_items: OrderItem[];
};

const CARRIERS = ['USPS', 'UPS', 'FedEx', 'DHL'];

const fmtUsd = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

const statusBadge = (status: string) => {
  switch (status) {
    case 'paid':
    case 'delivered':
      return 'bg-lime-100 text-lime-700';
    case 'shipped':
      return 'bg-blue-100 text-blue-700';
    case 'cancelled':
    case 'failed':
    case 'refunded':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-zinc-100 text-zinc-600';
  }
};

const sectionLabel = 'text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-2 block';

export default function OrderRow({ order }: { order: Order }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [tracking, setTracking] = useState(order.tracking_number ?? '');
  const [carrier, setCarrier] = useState(order.tracking_carrier ?? 'USPS');
  const [saving, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const updateOrder = (patch: Record<string, unknown>) => {
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Save failed' }));
        setError(body.error ?? 'Save failed');
        return;
      }
      router.refresh();
    });
  };

  const markShipped = () => {
    if (!tracking.trim()) {
      setError('Tracking number required to mark shipped');
      return;
    }
    updateOrder({
      fulfillment_status: 'shipped',
      tracking_number: tracking.trim(),
      tracking_carrier: carrier,
      shipped_at: new Date().toISOString(),
    });
  };

  const markDelivered = () => updateOrder({ fulfillment_status: 'delivered' });
  const markCancelled = () => updateOrder({ fulfillment_status: 'cancelled' });

  const address = order.shipping_address as
    | { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string }
    | null;

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((x) => !x)}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-zinc-50/80 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[10px] font-mono text-zinc-400 shrink-0">
            #{order.id.slice(0, 8)}
          </span>
          <span className="text-sm font-semibold text-zinc-950 truncate">{order.email}</span>
          <span className="text-xs text-zinc-400 shrink-0 hidden sm:block">
            {new Date(order.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusBadge(order.payment_status)}`}>
            {order.payment_status}
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusBadge(order.fulfillment_status)}`}>
            {order.fulfillment_status}
          </span>
          <span className="font-black text-zinc-950 text-sm min-w-15 text-right">
            {fmtUsd(order.total_cents)}
          </span>
          {expanded ? (
            <ChevronUp size={16} className="text-zinc-400" />
          ) : (
            <ChevronDown size={16} className="text-zinc-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-zinc-100 bg-zinc-50/50 px-5 py-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Items */}
            <div className="sm:col-span-2">
              <span className={sectionLabel}>Order Items</span>
              <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden">
                {order.order_items.map((it, i) => (
                  <div
                    key={it.id}
                    className={`flex items-center justify-between px-4 py-3 text-sm ${
                      i < order.order_items.length - 1 ? 'border-b border-zinc-100' : ''
                    }`}
                  >
                    <span className="text-zinc-700">
                      {it.name_snapshot}
                      <span className="text-zinc-400 ml-1">× {it.quantity}</span>
                    </span>
                    <span className="font-semibold text-zinc-900">
                      {fmtUsd(it.price_at_purchase_cents * it.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-zinc-100 px-4 py-3 space-y-1 bg-zinc-50">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Subtotal</span><span>{fmtUsd(order.subtotal_cents)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Shipping</span><span>{fmtUsd(order.shipping_cents)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-zinc-950 pt-1 border-t border-zinc-200">
                    <span>Total</span><span>{fmtUsd(order.total_cents)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ship to */}
            {address && (
              <div>
                <span className={sectionLabel}>Ship To</span>
                <div className="bg-white rounded-xl border border-zinc-100 px-4 py-3 text-sm text-zinc-700 leading-relaxed">
                  {address.line1}<br />
                  {address.line2 && <>{address.line2}<br /></>}
                  {address.city}, {address.state} {address.postal_code}<br />
                  {address.country}
                </div>
              </div>
            )}
          </div>

          {/* Fulfillment */}
          <div>
            <span className={sectionLabel}>Fulfillment</span>
            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="text"
                placeholder="Tracking number"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                className="px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100 font-mono bg-white flex-1 min-w-45"
              />
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-lime-400 bg-white"
              >
                {CARRIERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                type="button"
                disabled={
                  saving ||
                  order.fulfillment_status === 'shipped' ||
                  order.fulfillment_status === 'delivered'
                }
                onClick={markShipped}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-lime-400 text-zinc-950 hover:bg-lime-300 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed transition-all"
              >
                {saving ? 'Saving…' : 'Mark shipped'}
              </button>
            </div>

            {order.fulfillment_status === 'shipped' && (
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  disabled={saving}
                  onClick={markDelivered}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-lime-400 text-zinc-950 hover:bg-lime-300 disabled:opacity-50 transition-all"
                >
                  Mark delivered
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={markCancelled}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-all"
                >
                  Cancel order
                </button>
              </div>
            )}

            {order.shipped_at && (
              <p className="text-xs text-zinc-400 mt-2">
                Shipped {new Date(order.shipped_at).toLocaleDateString()}
                {order.tracking_number && (
                  <> · {order.tracking_carrier}{' '}
                    <span className="font-mono">{order.tracking_number}</span>
                  </>
                )}
              </p>
            )}
          </div>

          {error && (
            <div className="text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
