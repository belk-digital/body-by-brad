import { supabaseAdmin } from '@/lib/supabase/server';
import OrderRow from './OrderRow';
import { ShoppingCart, CreditCard, Truck, CheckCircle2, DollarSign } from 'lucide-react';

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

const fmtUsd = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

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

  const list = orders ?? [];
  const paid = list.filter((o) => o.payment_status === 'paid').length;
  const shipped = list.filter((o) => o.fulfillment_status === 'shipped').length;
  const delivered = list.filter((o) => o.fulfillment_status === 'delivered').length;
  const revenue = list
    .filter((o) => o.payment_status === 'paid')
    .reduce((sum, o) => sum + o.total_cents, 0);

  const stats = [
    { label: 'Total Orders', value: list.length, display: String(list.length), icon: ShoppingCart, lime: false },
    { label: 'Paid', value: paid, display: String(paid), icon: CreditCard, lime: true },
    { label: 'Shipped', value: shipped, display: String(shipped), icon: Truck, lime: false },
    { label: 'Delivered', value: delivered, display: String(delivered), icon: CheckCircle2, lime: false },
    { label: 'Revenue', value: revenue, display: fmtUsd(revenue), icon: DollarSign, lime: false },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl p-5 flex items-start justify-between ${
              s.lime ? 'bg-lime-400' : 'bg-white border border-zinc-100 shadow-sm'
            }`}
          >
            <div>
              <p className={`text-[9px] uppercase tracking-widest font-bold ${s.lime ? 'text-zinc-900/60' : 'text-zinc-400'}`}>
                {s.label}
              </p>
              <p className="text-2xl font-black mt-1 text-zinc-950">{s.display}</p>
            </div>
            <div className={`p-2 rounded-xl ${s.lime ? 'bg-zinc-950/10' : 'bg-zinc-100'}`}>
              <s.icon size={18} className={s.lime ? 'text-zinc-950' : 'text-zinc-500'} />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3 border border-red-100">
          {error.message}
        </div>
      )}

      <div className="space-y-3">
        {list.map((o) => (
          <OrderRow key={o.id} order={o} />
        ))}
        {list.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center text-sm text-zinc-500">
            No orders yet. Orders will appear here once Stripe checkout is live.
          </div>
        )}
      </div>
    </div>
  );
}
