import { supabaseAdmin } from '@/lib/supabase/server';
import OrderRow from './OrderRow';

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

export const dynamic = 'force-dynamic';

export default async function OrdersAdminPage() {
  const { data: orders, error } = await supabaseAdmin
    .from('orders')
    .select(`
      id, email, user_id, payment_status, fulfillment_status,
      subtotal_cents, shipping_cents, total_cents, shipping_address,
      tracking_number, tracking_carrier, shipped_at, created_at,
      order_items ( id, name_snapshot, price_at_purchase_cents, quantity )
    `)
    .order('created_at', { ascending: false })
    .returns<Order[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-950">
            Orders
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Mark orders as shipped and add tracking info.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3">
          {error.message}
        </div>
      )}

      <div className="space-y-3">
        {(orders ?? []).map((o) => (
          <OrderRow key={o.id} order={o} />
        ))}
        {(orders ?? []).length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center text-sm text-zinc-500">
            No orders yet. Orders will appear here once Stripe checkout is live.
          </div>
        )}
      </div>
    </div>
  );
}
