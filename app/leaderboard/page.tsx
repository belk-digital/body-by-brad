'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Dumbbell, Flame, TrendingUp, Activity, Trophy } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ── Mock data ────────────────────────────────────────────────────────────────

const ATHLETES = [
  {
    id: 1,
    name: 'Coach Brad',
    username: 'bradnboujee_',
    avatar: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139268/IMG_3044_vsxjow.jpg',
    weeklyMiles: 38.4,
    weeklyActivities: 6,
    elevationGain: 1240,
    weeklyTime: '5h 12m',
    lastActivity: 'Morning Run',
    lastActivityType: 'Run',
    streak: 14,
  },
  {
    id: 2,
    name: 'Jordan M.',
    username: 'jordan_moves',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
    weeklyMiles: 31.2,
    weeklyActivities: 5,
    elevationGain: 980,
    weeklyTime: '4h 08m',
    lastActivity: 'Evening Ride',
    lastActivityType: 'Ride',
    streak: 9,
  },
  {
    id: 3,
    name: 'Taylor R.',
    username: 'taylor_runs',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
    weeklyMiles: 27.6,
    weeklyActivities: 5,
    elevationGain: 760,
    weeklyTime: '3h 45m',
    lastActivity: 'Sunset Bootcamp',
    lastActivityType: 'Workout',
    streak: 7,
  },
  {
    id: 4,
    name: 'Alex P.',
    username: 'alexfitlife',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=80&q=80',
    weeklyMiles: 22.1,
    weeklyActivities: 4,
    elevationGain: 540,
    weeklyTime: '3h 02m',
    lastActivity: 'HIIT Session',
    lastActivityType: 'Workout',
    streak: 5,
  },
  {
    id: 5,
    name: 'Morgan S.',
    username: 'morgansweat',
    avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=80',
    weeklyMiles: 18.8,
    weeklyActivities: 4,
    elevationGain: 430,
    weeklyTime: '2h 38m',
    lastActivity: 'Track Run',
    lastActivityType: 'Run',
    streak: 4,
  },
  {
    id: 6,
    name: 'Casey T.',
    username: 'casey_trains',
    avatar: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=80&q=80',
    weeklyMiles: 15.3,
    weeklyActivities: 3,
    elevationGain: 310,
    weeklyTime: '2h 05m',
    lastActivity: 'Morning Jog',
    lastActivityType: 'Run',
    streak: 3,
  },
  {
    id: 7,
    name: 'Riley K.',
    username: 'riley_kicks',
    avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=80&q=80',
    weeklyMiles: 11.7,
    weeklyActivities: 3,
    elevationGain: 220,
    weeklyTime: '1h 42m',
    lastActivity: 'Cooldown Walk',
    lastActivityType: 'Walk',
    streak: 2,
  },
];

type Metric = 'miles' | 'activities' | 'elevation';

const TABS: { key: Metric; label: string; icon: React.ElementType; unit: string }[] = [
  { key: 'miles',      label: 'Weekly Miles',      icon: Flame,     unit: 'mi'  },
  { key: 'activities', label: 'Activities',         icon: Activity,  unit: 'wkts' },
  { key: 'elevation',  label: 'Elevation',          icon: TrendingUp, unit: 'ft' },
];

function getValue(a: typeof ATHLETES[0], metric: Metric) {
  if (metric === 'miles')      return a.weeklyMiles;
  if (metric === 'activities') return a.weeklyActivities;
  return Math.round(a.elevationGain * 3.281); // m → ft
}

function formatValue(val: number, metric: Metric) {
  if (metric === 'miles')      return val.toFixed(1);
  if (metric === 'activities') return String(val);
  return val.toLocaleString();
}

const TYPE_COLORS: Record<string, string> = {
  Run:     '#E6FF2B',
  Ride:    '#60a5fa',
  Workout: '#f472b6',
  Walk:    '#86efac',
};

const MEDAL = ['🥇', '🥈', '🥉'];

// ── Podium card (top 3) ───────────────────────────────────────────────────────

function PodiumCard({ athlete, rank, metric, maxVal }: {
  athlete: typeof ATHLETES[0];
  rank: number;
  metric: Metric;
  maxVal: number;
}) {
  const val = getValue(athlete, metric);
  const pct = (val / maxVal) * 100;
  const isFirst = rank === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: rank * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`relative rounded-2xl p-5 flex flex-col gap-4 ${
        isFirst ? 'bg-[#E6FF2B]' : 'bg-[#252525]'
      }`}
    >
      {/* Rank medal */}
      <span className="text-2xl leading-none">{MEDAL[rank]}</span>

      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <img
          src={athlete.avatar}
          alt={athlete.name}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div>
          <p className={`font-extrabold text-sm uppercase tracking-tight leading-none mb-0.5 ${isFirst ? 'text-[#1A1A1A]' : 'text-white'}`}>
            {athlete.name}
          </p>
          <p className={`text-[10px] font-medium ${isFirst ? 'text-black/50' : 'text-white/40'}`}>
            @{athlete.username}
          </p>
        </div>
      </div>

      {/* Value */}
      <div>
        <p className={`font-black text-3xl leading-none tabular-nums ${isFirst ? 'text-[#1A1A1A]' : 'text-white'}`}>
          {formatValue(val, metric)}
          <span className={`text-sm font-bold ml-1 ${isFirst ? 'text-black/50' : 'text-white/40'}`}>
            {TABS.find(t => t.key === metric)?.unit}
          </span>
        </p>
      </div>

      {/* Progress bar */}
      <div className={`h-1.5 rounded-full overflow-hidden ${isFirst ? 'bg-black/15' : 'bg-white/10'}`}>
        <motion.div
          className={`h-full rounded-full ${isFirst ? 'bg-[#1A1A1A]' : 'bg-[#E6FF2B]'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: rank * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Streak badge */}
      <div className={`absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${
        isFirst ? 'bg-black/10 text-[#1A1A1A]' : 'bg-white/8 text-white/60'
      }`}>
        🔥 {athlete.streak}d
      </div>
    </motion.div>
  );
}

// ── Row (rank 4+) ─────────────────────────────────────────────────────────────

function LeaderRow({ athlete, rank, metric, maxVal }: {
  athlete: typeof ATHLETES[0];
  rank: number;
  metric: Metric;
  maxVal: number;
}) {
  const val = getValue(athlete, metric);
  const pct = (val / maxVal) * 100;
  const unit = TABS.find(t => t.key === metric)?.unit ?? '';

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (rank - 3) * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex items-center gap-4 bg-[#252525] rounded-2xl px-5 py-4 group hover:bg-[#2e2e2e] transition-colors"
    >
      {/* Rank */}
      <span className="w-6 text-center text-xs font-bold text-white/30 shrink-0">
        {rank + 1}
      </span>

      {/* Avatar */}
      <img
        src={athlete.avatar}
        alt={athlete.name}
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />

      {/* Name + last activity */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-white uppercase tracking-tight leading-none mb-1 truncate">
          {athlete.name}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{
              backgroundColor: `${TYPE_COLORS[athlete.lastActivityType]}20`,
              color: TYPE_COLORS[athlete.lastActivityType],
            }}
          >
            {athlete.lastActivityType}
          </span>
          <span className="text-[10px] text-white/30 truncate">{athlete.lastActivity}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="hidden sm:block w-24 h-1.5 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#E6FF2B]"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: (rank - 3) * 0.06 + 0.2, ease: 'easeOut' }}
        />
      </div>

      {/* Value */}
      <div className="text-right shrink-0">
        <p className="font-black text-lg text-white tabular-nums leading-none">
          {formatValue(val, metric)}
        </p>
        <p className="text-[10px] text-white/30 font-medium">{unit}</p>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function LeaderboardContent() {
  const [metric, setMetric] = useState<Metric>('miles');
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

  const sorted = [...ATHLETES].sort((a, b) => getValue(b, metric) - getValue(a, metric));
  const maxVal = getValue(sorted[0], metric);
  const top3   = sorted.slice(0, 3);
  const rest   = sorted.slice(3);

  const ActiveIcon = TABS.find(t => t.key === metric)!.icon;

  return (
    <div className="relative w-full min-h-screen font-satoshi bg-[#1A1A1A] overflow-x-hidden">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#1A1A1A] pt-36 pb-16 px-4 sm:px-7 md:px-12 border-b border-white/8">
        <Navbar
          isLoading={false}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
              <Dumbbell size={12} className="text-[#1A1A1A]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
              BBB Community
            </span>
          </div>
          <h1
            className="text-white font-extrabold leading-none uppercase tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            LEADERBOARD
          </h1>
          <p className="text-white/40 text-sm md:text-base mt-4 max-w-md leading-relaxed">
            Weekly rankings powered by Strava. Connect your account to appear on the board.
          </p>

          {/* Connect Strava CTA */}
          <motion.a
            href="/api/strava/connect"
            className="relative mt-8 inline-flex items-center gap-0 overflow-hidden rounded-full border-2 border-[#E6FF2B] py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.span
              className="absolute inset-0 bg-[#E6FF2B]"
              style={{ transformOrigin: 'left' }}
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            />
            <motion.span
              className="relative z-10 mr-3"
              variants={{ rest: { color: '#E6FF2B' }, hover: { color: '#09090b' } }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
            >
              Connect Strava
            </motion.span>
            <motion.span
              className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              variants={{
                rest:  { backgroundColor: '#E6FF2B', color: '#09090b' },
                hover: { backgroundColor: '#09090b', color: '#E6FF2B' },
              }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
            >
              <IoChevronForward size={11} />
              <IoChevronForward size={11} className="-ml-1.5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </section>

      {/* ── Leaderboard ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-7 md:px-12 py-16 md:py-20">

        {/* Metric tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = metric === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setMetric(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-widest transition-all cursor-pointer ${
                  active
                    ? 'bg-[#E6FF2B] text-[#1A1A1A]'
                    : 'bg-white/6 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Week label */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-[#E6FF2B]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6FF2B]">
              Week of May 26 – Jun 1, 2026
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
            {ATHLETES.length} Athletes
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={metric}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Top 3 podium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {top3.map((athlete, i) => (
                <PodiumCard key={athlete.id} athlete={athlete} rank={i} metric={metric} maxVal={maxVal} />
              ))}
            </div>

            {/* Rest of rankings */}
            <div className="flex flex-col gap-2">
              {rest.map((athlete, i) => (
                <LeaderRow key={athlete.id} athlete={athlete} rank={i + 3} metric={metric} maxVal={maxVal} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Strava attribution */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-white/8" />
          <div className="flex items-center gap-2 text-white/25 text-[11px] font-semibold">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#FC4C02]">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
            <span>Powered by Strava</span>
          </div>
          <div className="h-px flex-1 bg-white/8" />
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <ReactLenis root>
      <LeaderboardContent />
    </ReactLenis>
  );
}
