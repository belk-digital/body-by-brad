'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, MapPin, Clock, Calendar } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;       // 'YYYY-MM-DD'
  time: string;       // '8:45 AM'
  endTime?: string;
  location: string;
  description: string;
  type: 'workout' | 'bootcamp' | 'hiit' | 'community' | 'merch';
  href: string;
  spots?: number;
  spotsLeft?: number;
}

const TYPE_COLORS: Record<CalendarEvent['type'], string> = {
  workout:   '#16a34a',
  bootcamp:  '#2563eb',
  hiit:      '#dc2626',
  community: '#7c3aed',
  merch:     '#d97706',
};

const TYPE_LABELS: Record<CalendarEvent['type'], string> = {
  workout:   'Workout',
  bootcamp:  'Bootcamp',
  hiit:      'HIIT',
  community: 'Community',
  merch:     'Merch Drop',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

interface Props {
  events: CalendarEvent[];
}

export default function EventCalendar({ events }: Props) {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected]   = useState<string | null>(null);
  const [detail, setDetail]       = useState<CalendarEvent | null>(null);

  const daysInMonth     = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfMonth = getFirstDayOfMonth(viewYear, viewMonth);

  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelected(null); setDetail(null);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelected(null); setDetail(null);
  }

  function handleDayClick(dateStr: string) {
    const dayEvents = eventsByDate[dateStr];
    if (!dayEvents?.length) return;
    if (selected === dateStr) { setSelected(null); setDetail(null); }
    else { setSelected(dateStr); setDetail(dayEvents[0]); }
  }

  const selectedEvents = selected ? (eventsByDate[selected] ?? []) : [];

  const upcomingEvents = [...events]
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">

      {/* ── Calendar grid ── */}
      <div className="rounded-2xl bg-white border border-zinc-200 p-5 md:p-7 flex flex-col">

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <motion.h3
            key={`${viewYear}-${viewMonth}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-zinc-950 font-extrabold uppercase tracking-widest text-sm"
          >
            {MONTHS[viewMonth]} {viewYear}
          </motion.h3>
          <button
            onClick={nextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <motion.div
          key={`${viewYear}-${viewMonth}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28 }}
          className="grid grid-cols-7 gap-1 flex-1"
        >
          {cells.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} />;

            const dateStr    = toDateStr(viewYear, viewMonth, day);
            const dayEvents  = eventsByDate[dateStr] ?? [];
            const hasEvents  = dayEvents.length > 0;
            const isToday    = dateStr === todayStr;
            const isSelected = dateStr === selected;

            return (
              <button
                key={dateStr}
                onClick={() => handleDayClick(dateStr)}
                disabled={!hasEvents}
                className={[
                  'relative flex flex-col items-center justify-start pt-1.5 pb-1 rounded-xl transition-all duration-150 min-h-[44px]',
                  hasEvents ? 'cursor-pointer' : 'cursor-default',
                  isSelected
                    ? 'bg-[#1A1A1A]'
                    : isToday
                    ? 'bg-zinc-100 ring-1 ring-zinc-300'
                    : hasEvents
                    ? 'hover:bg-zinc-50'
                    : '',
                ].join(' ')}
              >
                <span
                  className={[
                    'text-xs font-bold tabular-nums leading-none',
                    isSelected ? 'text-white' : isToday ? 'text-zinc-950 font-extrabold' : 'text-zinc-800',
                  ].join(' ')}
                >
                  {day}
                </span>

                {/* Event dots */}
                {hasEvents && (
                  <div className="flex gap-0.5 mt-1 flex-wrap justify-center max-w-[28px]">
                    {dayEvents.slice(0, 3).map(ev => (
                      <span
                        key={ev.id}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: isSelected ? '#E6FF2B' : TYPE_COLORS[ev.type] }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Legend */}
        <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap gap-x-4 gap-y-2">
          {(Object.entries(TYPE_LABELS) as [CalendarEvent['type'], string][]).map(([type, label]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[type] }} />
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-col gap-4">

        {/* Selected day detail */}
        <AnimatePresence mode="wait">
          {detail ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="rounded-2xl bg-white border border-zinc-200 p-5 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className="inline-block text-[9px] font-bold uppercase tracking-[0.22em] px-2 py-0.5 rounded-full mb-2"
                    style={{
                      backgroundColor: TYPE_COLORS[detail.type] + '18',
                      color: TYPE_COLORS[detail.type],
                    }}
                  >
                    {TYPE_LABELS[detail.type]}
                  </span>
                  <h4 className="text-zinc-950 font-extrabold uppercase text-sm leading-snug">
                    {detail.title}
                  </h4>
                </div>
                <button
                  onClick={() => { setSelected(null); setDetail(null); }}
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <Calendar size={12} className="shrink-0" />
                  <span>{new Date(detail.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <Clock size={12} className="shrink-0" />
                  <span>{detail.time}{detail.endTime ? ` – ${detail.endTime}` : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <MapPin size={12} className="shrink-0" />
                  <span>{detail.location}</span>
                </div>
              </div>

              <p className="text-zinc-500 text-xs leading-relaxed">
                {detail.description}
              </p>

              {/* Spots */}
              {detail.spots != null && detail.spotsLeft != null && (
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                    <span>{detail.spotsLeft} spots left</span>
                    <span>{detail.spots} total</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((detail.spots - detail.spotsLeft) / detail.spots) * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: TYPE_COLORS[detail.type] }}
                    />
                  </div>
                </div>
              )}

              {/* Multiple events on same day */}
              {selectedEvents.length > 1 && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Also on this day
                  </p>
                  {selectedEvents.filter(e => e.id !== detail.id).map(ev => (
                    <button
                      key={ev.id}
                      onClick={() => setDetail(ev)}
                      className="flex items-center gap-2 text-left rounded-xl bg-zinc-100 hover:bg-zinc-200 px-3 py-2 transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: TYPE_COLORS[ev.type] }} />
                      <span className="text-zinc-900 text-xs font-semibold truncate">{ev.title}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* CTA */}
              <motion.a
                href={detail.href}
                className="relative mt-1 flex w-full items-center justify-between overflow-hidden rounded-full border-2 border-[#1A1A1A] py-2.5 pl-5 pr-2 cursor-pointer"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span
                  className="absolute inset-0 bg-[#1A1A1A]"
                  style={{ transformOrigin: 'left' }}
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.35 }}
                />
                <motion.span
                  className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest"
                  variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#E6FF2B' } }}
                  transition={{ duration: 0.28 }}
                >
                  Register Now
                </motion.span>
                <motion.span
                  className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  variants={{
                    rest:  { backgroundColor: '#1A1A1A', color: '#E6FF2B' },
                    hover: { backgroundColor: '#E6FF2B', color: '#1A1A1A' },
                  }}
                  transition={{ duration: 0.28 }}
                >
                  <IoChevronForward size={11} />
                  <IoChevronForward size={11} className="-ml-1.5" />
                </motion.span>
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-white border border-zinc-200 p-5 flex flex-col items-center justify-center text-center min-h-[160px]"
            >
              <Calendar size={28} className="text-zinc-300 mb-3" />
              <p className="text-zinc-500 text-xs leading-relaxed">
                Select an event date
                <br />
                on the calendar to see details
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming events list */}
        <div className="rounded-2xl bg-white border border-zinc-200 p-5 flex flex-col gap-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400 mb-1">
            Upcoming Events
          </h4>

          {upcomingEvents.length === 0 ? (
            <p className="text-zinc-400 text-xs">No upcoming events scheduled.</p>
          ) : (
            upcomingEvents.map((ev, i) => {
              const d = new Date(ev.date + 'T00:00:00');
              return (
                <motion.button
                  key={ev.id}
                  onClick={() => {
                    const [y, m] = ev.date.split('-').map(Number);
                    setViewYear(y);
                    setViewMonth(m - 1);
                    setSelected(ev.date);
                    setDetail(ev);
                  }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3 text-left group cursor-pointer"
                >
                  {/* Date badge */}
                  <div className="shrink-0 flex flex-col items-center justify-center rounded-xl bg-zinc-100 w-11 h-11">
                    <span className="text-zinc-900 font-extrabold text-sm tabular-nums leading-none">
                      {String(d.getDate()).padStart(2, '0')}
                    </span>
                    <span className="text-zinc-400 text-[8px] font-bold uppercase tracking-widest">
                      {MONTHS[d.getMonth()].slice(0, 3)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-zinc-900 text-xs font-bold truncate group-hover:text-[#1A1A1A] transition-colors duration-200">
                      {ev.title}
                    </p>
                    <p className="text-zinc-400 text-[10px] truncate mt-0.5">{ev.time} · {ev.location}</p>
                  </div>

                  {/* Type dot */}
                  <span className="shrink-0 w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[ev.type] }} />
                </motion.button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
