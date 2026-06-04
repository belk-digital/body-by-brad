import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import UserDropdown from '@/components/layout/UserDropdown';

type Order = {
  id: string;
  stripe_session_id: string | null;
  payment_status: string;
  fulfillment_status: string;
  total_cents: number;
  tracking_number: string | null;
  tracking_carrier: string | null;
  created_at: string;
};

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

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in?next=/account');

  // Use the user's own session — RLS enforces that auth.uid() = user_id.
  // Never use the service role for user-facing reads.
  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, stripe_session_id, payment_status, fulfillment_status, total_cents, tracking_number, tracking_carrier, created_at')
    .order('created_at', { ascending: false })
    .returns<Order[]>();

  return (
    <main className="font-satoshi min-h-dvh bg-[#f5f0e1] px-4 py-16 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900">
              ← Back to site
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-950 mt-2">
              Your account
            </h1>
            <p className="text-zinc-500 text-sm mt-1">{user.email}</p>
          </div>
          <UserDropdown theme="dark" />
        </div>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-950 mb-4">
            Order history
          </h2>

          {error && (
            <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3">
              Could not load orders: {error.message}
            </div>
          )}

          {!error && (!orders || orders.length === 0) && (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/50 px-6 py-12 text-center">
              <p className="text-zinc-500 text-sm">You haven&apos;t placed any orders yet.</p>
              <Link
                href="/merchandise"
                className="inline-block mt-4 bg-zinc-950 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-700 transition-colors"
              >
                Shop merch
              </Link>
            </div>
          )}

          {!error && orders && orders.length > 0 && (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <div className="text-xs text-zinc-400 font-mono">
                      #{order.id.slice(0, 8)}
                    </div>
                    <div className="text-sm text-zinc-500 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    {order.tracking_number && (
                      <div className="text-xs text-zinc-600 mt-1">
                        Tracking: <span className="font-mono">{order.tracking_number}</span>
                        {order.tracking_carrier && ` (${order.tracking_carrier})`}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor(order.payment_status)}`}>
                      {order.payment_status}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor(order.fulfillment_status)}`}>
                      {order.fulfillment_status}
                    </span>
                    <span className="font-bold text-zinc-950">
                      {fmtUsd(order.total_cents)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
