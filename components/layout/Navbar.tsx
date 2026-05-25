'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCartOutline, IoPersonOutline } from 'react-icons/io5';
import { logoUrl, socialMenuItems } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/cart/CartContext';
import { useAuth } from '@/lib/auth/AuthContext';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import TextRoll from '@/components/ui/TextRoll';
import UserDropdown from '@/components/layout/UserDropdown';

function AuthSlot({ theme }: { theme: 'light' | 'dark' }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="w-7 h-7" aria-hidden />;
  }
  if (user) {
    return <UserDropdown theme={theme} />;
  }
  return (
    <Link
      href="/sign-in"
      aria-label="Sign in"
      className={`hover:opacity-70 transition-opacity ${
        theme === 'light' ? 'text-white' : 'text-black'
      }`}
    >
      <IoPersonOutline size={24} />
    </Link>
  );
}

// ─── MenuOverlay ────────────────────────────────────────────────────────────

function MenuOverlay() {
  const { lang, setLang, t } = useLanguage();
  return (
    <motion.div
      className="font-satoshi fixed inset-0 z-50 overflow-hidden bg-[#007AE5] text-white"
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Mobile language switcher - top left */}
      <motion.div
        className="absolute top-28 left-4 sm:hidden z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex gap-1 rounded-full bg-white/15 p-1 w-fit">
          {(['en', 'es'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                lang === l ? 'bg-white text-[#007AE5]' : 'text-white/70 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main content area — 3-column layout */}
      <motion.div
        className="absolute inset-x-0 bottom-0 top-20 flex gap-8 px-4 sm:px-7 md:px-12 md:top-[88px]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -28 }}
        transition={{ delay: 0.25, duration: 0.55, ease: 'easeOut' }}
      >
        {/* Left column — lang toggle top, socials middle, policy bottom */}
        <div className="hidden w-36 flex-shrink-0 flex-col justify-between py-10 md:flex lg:w-44">
          {/* Language switcher */}
          <div className="flex gap-1 rounded-full bg-white/15 p-1 w-fit">
            {(['en', 'es'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  lang === l ? 'bg-white text-[#007AE5]' : 'text-white/70 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-base font-semibold">
            {socialMenuItems.map((item) => (
              <a key={item} href="#" className="relative flex cursor-pointer overflow-visible">
                <TextRoll className="transition-colors">{item}</TextRoll>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-sm font-medium opacity-60">
            {t.policyItems.map((item) => (
              <a key={item} href="#" className="transition-opacity hover:opacity-100">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Center column — main nav, vertically centered */}
        <div className="flex w-auto flex-shrink-0 flex-col items-start justify-center gap-0.5 text-[12vw] font-semibold leading-[0.95] tracking-tight sm:text-[9vw] md:text-[clamp(2.6rem,3.5vw,4.5rem)]">
          {t.menuItems.map((item) => {
            const lower = item.toLowerCase();
            const href =
              lower === 'events' ? '/events' :
              lower === 'packages' || lower === 'paquetes' ? '/packages' :
              lower === 'merchandise' || lower === 'mercancía' || lower === 'mercancia' ? '/merchandise' :
              '#';
            return (
            <a
              key={item}
              href={href}
              className="relative flex cursor-pointer overflow-visible"
            >
              <TextRoll center className="uppercase transition-colors">
                {item}
              </TextRoll>
            </a>
            );
          })}
        </div>

        {/* Latest Events card (middle) */}
        <a href="/events" className="hidden flex-1 min-w-0 flex-col justify-center py-10 md:flex">
          <div className="flex h-full max-h-[78%] flex-col overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:border-white/50 transition-colors">
            {/* Event Image */}
            <div className="relative flex-1 overflow-hidden rounded-t-2xl bg-white/5">
              <img
                src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg"
                alt="Cooldown Event"
                className="absolute inset-0 h-full w-full object-cover object-bottom"
              />
            </div>
            {/* Event info + marquee */}
            <div className="bg-white text-black px-4 py-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-60">
                {t.latestEvents}
              </p>
              <div className="flex items-center gap-2">
                <div className="overflow-hidden flex-1">
                  <motion.div
                    className="flex gap-12 text-sm font-medium whitespace-nowrap"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    <span>{t.cooldownMarquee}</span>
                    <span>{t.cooldownMarquee}</span>
                  </motion.div>
                </div>
                <span className="flex-shrink-0 text-lg">→</span>
              </div>
            </div>
          </div>
        </a>

        {/* Right column — Merchandise card */}
        <a href="/merchandise" className="hidden w-[26%] max-w-[320px] flex-shrink-0 flex-col justify-center py-10 md:flex">
          <div className="flex h-full max-h-[78%] flex-col overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:border-white/50 transition-colors">
            {/* Merch Image */}
            <div className="relative flex-1 overflow-hidden rounded-t-2xl bg-white/5">
              <img
                src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp"
                alt="Body By Brad Merchandise"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
            {/* Merch info */}
            <div className="bg-white text-black px-4 py-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-60">
                {t.merchandiseLabel}
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{t.shopNow}</span>
                <span className="flex-shrink-0 text-lg">→</span>
              </div>
            </div>
          </div>
        </a>
      </motion.div>

      {/* Mobile-only get started button — bottom of overlay */}
      <motion.div
        className="absolute bottom-6 left-4 right-4 sm:hidden z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
      >
        <a
          href="#"
          className="flex items-center justify-center gap-2 w-full bg-white text-[#007AE5] py-4 rounded-full font-bold text-sm uppercase tracking-wide"
        >
          {t.getStarted}
          <span className="text-base leading-none">↗</span>
        </a>
      </motion.div>
    </motion.div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

type NavbarProps = {
  isLoading: boolean;
  isMenuOpen: boolean;
  isScrolled: boolean;
  onMenuToggle: (open: boolean) => void;
};

export default function Navbar({
  isLoading,
  isMenuOpen,
  isScrolled,
  onMenuToggle,
}: NavbarProps) {
  const { t, lang, setLang } = useLanguage();
  const { count: cartCount, open: openCart, hydrated } = useCart();
  const displayCount = hydrated ? cartCount : 0;
  return (
    <>
      <AnimatePresence>
        {!isLoading && isMenuOpen && <MenuOverlay />}
      </AnimatePresence>

      {/* Hero navbar — absolute, slides down after loading */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={isLoading ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="font-satoshi z-[60] absolute top-0 left-0 right-0 px-4 pt-5 sm:px-7 sm:pt-7 md:px-12 md:pt-9 flex items-center justify-between"
      >
        <div className="flex flex-1 items-center justify-start gap-2 sm:gap-3">
          <HamburgerMenu
            checked={isMenuOpen}
            onToggle={onMenuToggle}
            size={42}
            strokeWidth={2.2}
            strokeColor="#FFFFFF"
          />
          <AnimatePresence>
            {isMenuOpen && (
              <motion.button
                type="button"
                className="text-sm font-semibold sm:text-base text-white"
                onClick={() => onMenuToggle(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
              >
                Close
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <a
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Body By Brad home"
        >
          <img
            src={logoUrl}
            alt="Body By Brad"
            className="w-auto h-[52px] sm:h-[62px] md:h-[72px] brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
          />
        </a>

        <div className="flex flex-1 items-center justify-end gap-5 sm:gap-6 md:gap-8">
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative text-white hover:opacity-70 transition-opacity cursor-pointer"
          >
            <IoCartOutline size={26} />
            {displayCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#DFF994] text-black text-[9px] font-bold flex items-center justify-center">
                {displayCount}
              </span>
            )}
          </button>
          <AuthSlot theme="light" />
          <a
            href="#"
            className="hidden sm:flex items-center gap-1 font-semibold text-white sm:gap-1.5 sm:text-sm md:text-lg"
          >
            <TextRoll className="whitespace-nowrap pb-[0.2em] pt-[0.1em]">{t.getStarted}</TextRoll>
            <span aria-hidden="true" className="text-lg leading-none md:text-xl">
              ↗
            </span>
          </a>
        </div>
      </motion.nav>

      {/* Floating navbar — slides in from top when scrolling upward */}
      <AnimatePresence>
        {!isLoading && isScrolled && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="font-satoshi z-[60] fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 bg-[#F5F0E1] rounded-full shadow-lg px-6 py-4 flex items-center justify-between"
          >
            <div className="flex flex-1 items-center justify-start gap-2 sm:gap-3">
              <HamburgerMenu
                checked={isMenuOpen}
                onToggle={onMenuToggle}
                size={42}
                strokeWidth={2.2}
                strokeColor="#000000"
              />
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.button
                    type="button"
                    className="text-sm font-semibold sm:text-base text-black"
                    onClick={() => onMenuToggle(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {t.close}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <a
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              href="/"
              aria-label="Body By Brad home"
            >
              <img
                src={logoUrl}
                alt="Body By Brad"
                className="w-auto h-[42px] sm:h-[48px] brightness-0"
              />
            </a>

            <div className="flex flex-1 items-center justify-end gap-5 sm:gap-6 md:gap-8">
              <div className="hidden sm:flex gap-0.5 rounded-full bg-black/10 p-0.5">
                {(['en', 'es'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      lang === l ? 'bg-zinc-950 text-white' : 'text-black/50 hover:text-black'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                aria-label="Cart"
                onClick={openCart}
                className="relative text-black hover:opacity-70 transition-opacity cursor-pointer"
              >
                <IoCartOutline size={26} />
                {displayCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#007AE5] text-white text-[9px] font-bold flex items-center justify-center">
                    {displayCount}
                  </span>
                )}
              </button>
              <AuthSlot theme="dark" />
              <a
                href="#"
                className="hidden sm:flex items-center gap-1 font-semibold text-black sm:gap-1.5 sm:text-sm md:text-lg"
              >
                <TextRoll className="whitespace-nowrap pb-[0.2em] pt-[0.1em]">
                  get started
                </TextRoll>
                <span aria-hidden="true" className="text-lg leading-none md:text-xl">
                  ↗
                </span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
