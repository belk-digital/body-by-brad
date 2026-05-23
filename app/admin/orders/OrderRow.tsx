'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

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

const statusColor = (status: string) => {
  switch (status) {
    case 'paid':
    case 'delivered':
      return 'bg-emerald-100 text-emerald-700';
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
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((x) => !x)}
        className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left hover:bg-zinc-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">#{order.id.slice(0, 8)}</span>
            <span className="text-sm font-semibold text-zinc-950 truncate">{order.email}</span>
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            {new Date(order.created_at).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor(order.payment_status)}`}>
            {order.payment_status}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor(order.fulfillment_status)}`}>
            {order.fulfillment_status}
          </span>
          <span className="font-bold text-zinc-950 text-sm">{fmtUsd(order.total_cents)}</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-zinc-200 p-5 bg-zinc-50/50 space-y-5">
          {/* Items */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-2">Items</h3>
            <div className="space-y-1">
              {order.order_items.map((it) => (
                <div key={it.id} className="flex items-center justify-between text-sm">
                  <span className="text-zinc-700">
                    {it.name_snapshot} × {it.quantity}
                  </span>
                  <span className="text-zinc-500">
                    {fmtUsd(it.price_at_purchase_cents * it.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-zinc-200 pt-2 mt-2 space-y-1 text-sm">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>{fmtUsd(order.subtotal_cents)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping</span>
                  <span>{fmtUsd(order.shipping_cents)}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-950">
                  <span>Total</span>
                  <span>{fmtUsd(order.total_cents)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          {address && (
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-2">Ship to</h3>
              <div className="text-sm text-zinc-700 leading-relaxed">
                {address.line1}<br />
                {address.line2 && <>{address.line2}<br /></>}
                {address.city}, {address.state} {address.postal_code}<br />
                {address.country}
              </div>
            </div>
          )}

          {/* Fulfillment controls */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-2">Fulfillment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Tracking number"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                className="px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 font-mono"
              />
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 bg-white"
              >
                {CARRIERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                type="button"
                disabled={saving || order.fulfillment_status === 'shipped' || order.fulfillment_status === 'delivered'}
                onClick={markShipped}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white disabled:bg-zinc-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
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
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white disabled:bg-zinc-300 hover:bg-emerald-700 transition-colors"
                >
                  Mark delivered
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={markCancelled}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors"
                >
                  Cancel order
                </button>
              </div>
            )}

            {order.shipped_at && (
              <div className="text-xs text-zinc-500 mt-2">
                Shipped {new Date(order.shipped_at).toLocaleDateString()}
                {order.tracking_number && (
                  <> · {order.tracking_carrier} <span className="font-mono">{order.tracking_number}</span></>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">{error}</div>
          )}
        </div>
      )}
    </div>
  );
}
