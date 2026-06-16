import { supabaseAdmin } from '@/lib/supabase/server';
import { Users, CalendarDays, Layers } from 'lucide-react';

type Registration = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  event: string;
  fitness_level: string;
  heard_from: string | null;
  emergency_name: string;
  notes: string | null;
  created_at: string;
};

export const dynamic = 'force-dynamic';

export default async function RegistrationsAdminPage() {
  const { data: registrations, error } = await supabaseAdmin
    .from('event_registrations')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Registration[]>();

  const list = registrations ?? [];
  const uniqueEvents = new Set(list.map((r) => r.event)).size;
  const now = new Date();
  const thisMonth = list.filter((r) => {
    const d = new Date(r.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const stats = [
    { label: 'Total', value: list.length, icon: Users, lime: true },
    { label: 'Events', value: uniqueEvents, icon: Layers, lime: false },
    { label: 'This Month', value: thisMonth, icon: CalendarDays, lime: false },
  ];

  const levelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-blue-100 text-blue-700';
      case 'intermediate': return 'bg-lime-100 text-lime-700';
      case 'advanced': return 'bg-zinc-800 text-white';
      default: return 'bg-zinc-100 text-zinc-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
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
              <p className="text-3xl font-black mt-1 text-zinc-950">{s.value}</p>
            </div>
            <div className={`p-2 rounded-xl ${s.lime ? 'bg-zinc-950/10' : 'bg-zinc-100'}`}>
              <s.icon size={18} className={s.lime ? 'text-zinc-950' : 'text-zinc-500'} />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3 border border-red-100 mb-6">
          {error.message}
        </div>
      )}

      {list.length === 0 && !error ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center text-sm text-zinc-500">
          No registrations yet. They will appear here once someone signs up.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left px-5 py-3.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Name
                  </th>
                  <th className="text-left px-5 py-3.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Email
                  </th>
                  <th className="text-left px-5 py-3.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Event
                  </th>
                  <th className="text-left px-5 py-3.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Level
                  </th>
                  <th className="text-left px-5 py-3.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Emergency Contact
                  </th>
                  <th className="text-left px-5 py-3.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {list.map((r) => (
                  <tr key={r.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="px-5 py-4 font-semibold text-zinc-900">
                      {r.first_name} {r.last_name}
                    </td>
                    <td className="px-5 py-4 text-zinc-500">{r.email}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-1">
                        {r.event}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-1 ${levelColor(r.fitness_level)}`}>
                        {r.fitness_level}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-500">{r.emergency_name}</td>
                    <td className="px-5 py-4 text-zinc-400 text-xs">{fmt(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
