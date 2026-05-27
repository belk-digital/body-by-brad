'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Gauge, Mars, Venus } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
type Gender      = 'male' | 'female';
type ActivityKey = 0 | 1 | 2 | 3;
type GoalKey     = 'lose' | 'lose10' | 'maintain' | 'gain';
type MealView    = 'day' | '3' | '4' | '5';
type ProteinKey  = 0 | 1 | 2;

// ── Data ─────────────────────────────────────────────────────────────────────
const ACTIVITY = [
  { label: 'LOW',       short: 'LOW',  desc: 'Little or no exercise. Desk job, sedentary lifestyle.' },
  { label: 'MIDDLE',    short: 'MID',  desc: 'Activity that burns an additional 400–650 calories for females or 500–800 calories for males.' },
  { label: 'HIGH',      short: 'HIGH', desc: 'Hard exercise 3–5 days/week. Burns 650+ extra calories daily.' },
  { label: 'VERY HIGH', short: 'V.HI', desc: 'Intense training 6–7 days/week. Burns 800+ extra calories daily.' },
];
const ACTIVITY_MULT = [1.2, 1.375, 1.55, 1.725] as const;

const GOALS: { key: GoalKey; label: string }[] = [
  { key: 'lose',     label: 'LOSE'     },
  { key: 'lose10',   label: 'LOSE 10%' },
  { key: 'maintain', label: 'MAINTAIN' },
  { key: 'gain',     label: 'GAIN'     },
];
const GOAL_MULT: Record<GoalKey, number> = {
  lose: 0.75, lose10: 0.9, maintain: 1.0, gain: 1.15,
};

const PROTEIN_LEVELS = ['LOW', 'NORMAL', 'HIGH'] as const;
const PROTEIN_MULT   = [1.5, 2.0, 2.5] as const;

const SUGGESTED_PROGRAMS: Record<GoalKey, { title: string; desc: string; img: string; href: string }[]> = {
  lose: [
    { title: 'WEIGHT LOSS',     desc: 'Expert-guided programs to burn fat and reshape your body.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=100&q=80', href: '/services' },
    { title: 'ONLINE COACHING', desc: 'Accountability and structure from anywhere in the world.',   img: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=100&q=80', href: '/services' },
  ],
  lose10: [
    { title: 'WEIGHT LOSS',     desc: 'Expert-guided programs to burn fat and reshape your body.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=100&q=80', href: '/services' },
    { title: 'FITNESS CLASSES', desc: 'High-energy group sessions built around real results.',      img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=100&q=80', href: '/services' },
  ],
  maintain: [
    { title: 'AT HOME TRAINING', desc: 'Complete training experience designed around your home setup.', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=100&q=80', href: '/services' },
    { title: 'ONLINE COACHING',  desc: 'Accountability and structure from anywhere in the world.',      img: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=100&q=80', href: '/services' },
  ],
  gain: [
    { title: 'ELITE TRAINING',          desc: 'The highest level of 1-on-1 coaching with daily support.',   img: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=100&q=80', href: '/services' },
    { title: 'ONLINE FITNESS TRAINING', desc: 'Fully custom programs built around your schedule and goals.', img: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=100&q=80', href: '/services' },
  ],
};

// ── Calculation ───────────────────────────────────────────────────────────────
interface Result { kcal: number }

function computeResult(
  gender: Gender, age: string, weight: string,
  height: string, activity: ActivityKey, goal: GoalKey,
): Result | null {
  const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);
  if (!a || !w || !h || a <= 0 || w <= 0 || h <= 0) return null;
  const bmr  = 10 * w + 6.25 * h - 5 * a + (gender === 'male' ? 5 : -161);
  const tdee = bmr * ACTIVITY_MULT[activity];
  return { kcal: Math.round(tdee * GOAL_MULT[goal]) };
}

// ── Sub-components ────────────────────────────────────────────────────────────
function GenderToggle({ gender, onChange }: { gender: Gender; onChange: (g: Gender) => void }) {
  const options = [
    { key: 'male'   as Gender, Icon: Mars,  label: 'MALE'   },
    { key: 'female' as Gender, Icon: Venus, label: 'FEMALE' },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(({ key, Icon, label }) => {
        const active = gender === key;
        return (
          <button key={key} onClick={() => onChange(key)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl py-5 sm:py-7 transition-all cursor-pointer"
            style={{ backgroundColor: active ? '#E6FF2B' : '#e8e8e8', color: active ? '#111' : '#888' }}>
            <Icon size={24} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PillInput({ placeholder, value, onChange, suffix }: {
  placeholder: string; value: string; onChange: (v: string) => void; suffix?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex items-center rounded-full transition-colors"
      style={{ border: '1.5px solid rgba(255,255,255,0.25)', backgroundColor: focused ? '#fff' : 'rgba(255,255,255,0.06)' }}>
      <input
        type="number" min="0" placeholder={placeholder} value={value}
        onChange={e => { const v = e.target.value; if (v === '' || parseFloat(v) >= 0) onChange(v); }}
        onKeyDown={e => { if (e.key === '-' || e.key === '+' || e.key === 'e') e.preventDefault(); }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="min-w-0 flex-1 bg-transparent py-2.5 pl-3 text-sm placeholder-white/30 focus:outline-none transition-colors"
        style={{ color: focused ? '#111' : '#fff' }}
      />
      {suffix && (
        <span className="text-[11px] font-bold pointer-events-none pr-3 transition-colors"
          style={{ color: focused ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)' }}>
          {suffix}
        </span>
      )}
    </div>
  );
}

function HeightInput({ value, onChange, unit, onUnitChange }: {
  value: string; onChange: (v: string) => void;
  unit: 'cm' | 'in'; onUnitChange: (u: 'cm' | 'in') => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex items-center rounded-full transition-colors"
      style={{ border: '1.5px solid rgba(255,255,255,0.25)', backgroundColor: focused ? '#fff' : 'rgba(255,255,255,0.06)' }}>
      <input
        type="number" min="0" placeholder="Height" value={value}
        onChange={e => { const v = e.target.value; if (v === '' || parseFloat(v) >= 0) onChange(v); }}
        onKeyDown={e => { if (e.key === '-' || e.key === '+' || e.key === 'e') e.preventDefault(); }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="min-w-0 flex-1 bg-transparent py-2.5 pl-3 text-sm placeholder-white/30 focus:outline-none transition-colors"
        style={{ color: focused ? '#111' : '#fff' }}
      />
      <div className="flex shrink-0 items-center gap-1 pr-3">
        {(['in', 'cm'] as const).map(u => (
          <button key={u} onClick={() => onUnitChange(u)}
            className="text-[11px] font-bold uppercase cursor-pointer transition-colors"
            style={{ color: unit === u ? (focused ? '#111' : '#fff') : (focused ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)') }}>
            {u.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivitySlider({ value, onChange }: { value: ActivityKey; onChange: (v: ActivityKey) => void }) {
  return (
    <div>
      <p className="leading-relaxed mb-4 text-[14px] sm:text-[16px]"
        style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(255,255,255,0.6)' }}>
        <span className="font-bold text-white">{ACTIVITY[value].label}:</span>{' '}{ACTIVITY[value].desc}
      </p>
      <div className="relative flex items-center h-5 mb-2">
        <div className="absolute left-0 right-0 h-px bg-white/20" />
        {([0, 1, 2, 3] as const).map(i => (
          <button key={i} onClick={() => onChange(i)}
            className="absolute w-4 h-4 rounded-full border-2 transition-all cursor-pointer"
            style={{ left: `${(i / 3) * 100}%`, transform: 'translateX(-50%)', backgroundColor: value === i ? '#fff' : 'transparent', borderColor: value === i ? '#fff' : 'rgba(255,255,255,0.3)' }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {ACTIVITY.map((a, i) => (
          <span key={i} className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest"
            style={{ color: value === i ? '#fff' : 'rgba(255,255,255,0.35)' }}>
            <span className="hidden sm:inline">{a.label}</span>
            <span className="sm:hidden">{a.short}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function GoalButtons({ goal, onChange }: { goal: GoalKey; onChange: (g: GoalKey) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {GOALS.map(g => (
        <button key={g.key} onClick={() => onChange(g.key)}
          className="py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
          style={{ backgroundColor: goal === g.key ? '#000' : 'transparent', color: goal === g.key ? '#fff' : 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.15)' }}>
          {g.label}
        </button>
      ))}
    </div>
  );
}

function ProteinSlider({ value, onChange }: { value: ProteinKey; onChange: (v: ProteinKey) => void }) {
  return (
    <div>
      <p className="mb-3 text-[14px] sm:text-[16px]"
        style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(113,113,122,1)' }}>
        We recommend to start with normal level. If you do a lot of lifting, try &quot;high&quot;.
      </p>
      <div className="relative flex items-center h-5 mb-2">
        <div className="absolute left-0 right-0 h-px bg-zinc-200" />
        {([0, 1, 2] as const).map(i => (
          <button key={i} onClick={() => onChange(i)}
            className="absolute w-4 h-4 rounded-full border-2 transition-all cursor-pointer"
            style={{ left: `${(i / 2) * 100}%`, transform: 'translateX(-50%)', backgroundColor: value === i ? '#111' : '#fff', borderColor: value === i ? '#111' : '#ccc' }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {PROTEIN_LEVELS.map((l, i) => (
          <span key={i} className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: value === i ? '#111' : 'rgba(0,0,0,0.3)' }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function BMISection() {
  const [gender,       setGender]       = useState<Gender>('male');
  const [age,          setAge]          = useState('');
  const [weight,       setWeight]       = useState('');
  const [height,       setHeight]       = useState('');
  const [heightUnit,   setHeightUnit]   = useState<'cm' | 'in'>('cm');
  const [activity,     setActivity]     = useState<ActivityKey>(0);
  const [goal,         setGoal]         = useState<GoalKey>('lose');
  const [result,       setResult]       = useState<Result | null>(null);
  const [mealView,     setMealView]     = useState<MealView>('day');
  const [proteinLevel, setProteinLevel] = useState<ProteinKey>(1);

  const handleCalculate = () => {
    const heightCm = heightUnit === 'in' ? String(parseFloat(height) * 2.54) : height;
    const r = computeResult(gender, age, weight, heightCm, activity, goal);
    if (r) { setResult(r); setMealView('day'); setProteinLevel(1); }
  };

  const handleClear = () => {
    setAge(''); setWeight(''); setHeight('');
    setHeightUnit('cm'); setActivity(0); setGoal('lose');
    setResult(null); setMealView('day'); setProteinLevel(1);
  };

  // Dynamic macros
  const w          = parseFloat(weight) || 0;
  const meals      = mealView === 'day' ? 1 : parseInt(mealView);
  const dynProtein = result ? Math.max(0, Math.round(w * PROTEIN_MULT[proteinLevel])) : 0;
  const dynFat     = result ? Math.max(0, Math.round((result.kcal * 0.25) / 9)) : 0;
  const dynCarbs   = result ? Math.max(0, Math.round((result.kcal - dynProtein * 4 - dynFat * 9) / 4)) : 0;
  const dynTotal   = (dynProtein * 4 + dynCarbs * 4 + dynFat * 9) || 1;
  const carbPct    = Math.round((dynCarbs   * 4 / dynTotal) * 100);
  const protPct    = Math.round((dynProtein * 4 / dynTotal) * 100);
  const fatPct     = Math.round((dynFat     * 9 / dynTotal) * 100);
  const suggested  = SUGGESTED_PROGRAMS[goal];

  // ── Form ─────────────────────────────────────────────────────────────────────
  const FormContent = (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: 'rgba(255,255,255,0.4)' }}>Body Parameters</p>
        <GenderToggle gender={gender} onChange={setGender} />
      </div>

      {/* Inputs: stack on xs, 3-col from sm */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <PillInput placeholder="Age"    value={age}    onChange={setAge} />
        <PillInput placeholder="Weight" value={weight} onChange={setWeight} suffix="KG" />
        <HeightInput value={height} onChange={setHeight} unit={heightUnit} onUnitChange={setHeightUnit} />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: 'rgba(255,255,255,0.4)' }}>Activity Level</p>
        <ActivitySlider value={activity} onChange={setActivity} />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: 'rgba(255,255,255,0.4)' }}>Goals</p>
        <GoalButtons goal={goal} onChange={setGoal} />
      </div>

      <div className="flex items-center justify-between pt-1">
        <button onClick={handleClear}
          className="text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
          CLEAR
        </button>
        <button onClick={handleCalculate}
          className="rounded-lg px-6 sm:px-8 py-3 text-[11px] font-bold uppercase tracking-widest bg-black text-white transition-colors cursor-pointer"
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E6FF2B'; e.currentTarget.style.color = '#000'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#000';    e.currentTarget.style.color = '#fff'; }}>
          CALCULATE
        </button>
      </div>
    </div>
  );

  // ── Results ───────────────────────────────────────────────────────────────────
  const ResultContent = result ? (
    <div className="py-6 sm:py-8">
      <p className="text-sm text-zinc-500 mb-3">Your Result</p>

      {/* Kcal + Macros — stack on narrow, row on wider panels */}
      <div className="flex flex-col sm:flex-row items-start gap-5 mb-6">
        <div className="shrink-0">
          <p className="font-extrabold leading-none text-zinc-950"
            style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>
            {result.kcal}<span className="text-xl font-bold text-zinc-400"> kcal</span>
          </p>
          <p className="mt-2 leading-relaxed text-[14px] sm:text-[16px]"
            style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(113,113,122,1)' }}>
            Suggested amount of calories<br /><strong className="text-zinc-700">per day</strong>.
          </p>
        </div>
        <div className="flex-1 w-full">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-950 mb-2 pb-2 border-b border-zinc-200">
            MACRONUTRIENTS
          </p>
          <div className="space-y-2 pt-1">
            {[
              { label: 'Carbohydrate', g: dynCarbs,   pct: carbPct },
              { label: 'Protein',      g: dynProtein,  pct: protPct },
              { label: 'Fat',          g: dynFat,      pct: fatPct  },
            ].map(m => (
              <div key={m.label} className="flex justify-between text-[14px] sm:text-[16px]"
                style={{ fontFamily: 'Roboto, sans-serif' }}>
                <span className="text-zinc-500">{m.label}</span>
                <span>
                  <strong className="text-zinc-950">{Math.round(m.g / meals)}g</strong>
                  <span className="text-zinc-400">/{m.pct}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meal tabs — 2-col on xs, 4-col from sm */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {(['day', '3', '4', '5'] as const).map(v => (
          <button key={v} onClick={() => setMealView(v)}
            className="py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors"
            style={{ backgroundColor: mealView === v ? '#111' : '#f3f3f3', color: mealView === v ? '#fff' : '#888' }}>
            {v === 'day' ? 'Per Day' : `${v} Meals`}
          </button>
        ))}
      </div>

      {/* Adjust Protein */}
      <div className="mb-5 border-t border-zinc-100 pt-5">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-950 mb-3">
          Adjust Protein
        </p>
        <ProteinSlider value={proteinLevel} onChange={setProteinLevel} />
      </div>

      {/* Suggested Programs */}
      <div className="border-t border-zinc-100 pt-5">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-950 mb-4">
          Suggested Programs
        </p>
        <div className="flex items-center gap-3">
          {suggested.map((p, i) => (
            <a key={i} href={p.href} className="flex flex-1 min-w-0 items-center gap-2 cursor-pointer group">
              <div className="w-11 h-11 shrink-0 rounded-lg overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" draggable={false} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-zinc-950 leading-tight truncate">
                  {p.title}
                </p>
                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5 leading-snug"
                  style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {p.desc}
                </p>
              </div>
            </a>
          ))}
          <a href="/services"
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer">
            <ArrowRight size={15} className="text-zinc-600" />
          </a>
        </div>
      </div>

      <button onClick={handleClear}
        className="mt-6 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer">
        ← Recalculate
      </button>
    </div>
  ) : null;

  return (
    <section id="calories" className="w-full overflow-hidden" style={{ backgroundColor: '#E6FF2B' }}>

      {/* ── Mobile / Tablet (< md) ───────────────────────────────────────────── */}
      <div className="md:hidden px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8 sm:mb-10">
          <Gauge size={36} strokeWidth={1.5} color="#1a1a1a" className="mb-5" />
          <h2 className="font-extrabold uppercase leading-tight text-zinc-950 mb-4"
            style={{ fontSize: 'clamp(2rem,10vw,3rem)' }}>
            CALORIES<br />CALCULATOR
          </h2>
          <p className="leading-relaxed max-w-sm"
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: 'rgba(0,0,0,0.5)' }}>
            Calculate your daily calorie needs and optimal macronutrient ratios. Enter your age, height, weight, gender, and activity level.
          </p>
        </div>

        <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ backgroundColor: '#1a1a1a' }}>
          {FormContent}
        </div>

        <AnimatePresence>
          {result && (
            <motion.div key="mobile-result"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {ResultContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Desktop (md+) ────────────────────────────────────────────────────── */}
      <div className="hidden md:block relative overflow-hidden" style={{ minHeight: 'clamp(620px,85vh,780px)' }}>

        {/* Intro — left half, default state */}
        <AnimatePresence>
          {!result && (
            <motion.div key="intro"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-12 lg:px-20"
              style={{ width: '50%' }}>
              <Gauge size={48} strokeWidth={1.2} color="#1a1a1a" className="mb-8" />
              <h2 className="font-extrabold uppercase tracking-tight text-zinc-950 mb-6 leading-[0.9]"
                style={{ fontSize: 'clamp(2.4rem,4vw,5.5rem)' }}>
                CALORIES<br />CALCULATOR
              </h2>
              <p className="leading-relaxed mb-8"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: 'rgba(0,0,0,0.5)', maxWidth: '280px' }}>
                Calculate your daily calorie needs and optimal macronutrient ratios. Enter your age, height, weight, gender, and activity level.
              </p>
              <span className="text-2xl" style={{ color: 'rgba(0,0,0,0.35)' }}>→</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results — right half, after calculate */}
        <AnimatePresence>
          {result && (
            <motion.div key="results"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
              className="absolute inset-y-0 right-0 overflow-y-auto px-8 md:px-10 lg:px-14"
              style={{ width: '50%', backgroundColor: '#fff' }}>
              {ResultContent}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dark form panel — slides right → left */}
        <motion.div className="absolute top-0 h-full"
          style={{ width: '50%', left: '50%', backgroundColor: '#1a1a1a' }}
          animate={{ x: result ? '-100%' : '0%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}>
          <div className="h-full flex flex-col justify-center px-8 md:px-10 lg:px-14 py-8 overflow-y-auto">
            {FormContent}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
