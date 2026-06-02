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

function MenuOverlay({ onClose }: { onClose: () => void }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <motion.div
      className="font-satoshi fixed inset-0 overflow-hidden bg-[#1a1a1a] text-white"
      style={{ zIndex: 70 }}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
    >
      {/* Close button — matches hero navbar position */}
      <div className="absolute top-5 left-4 sm:top-7 sm:left-7 md:top-9 md:left-12 z-20 flex items-center gap-2 sm:gap-3">
        <HamburgerMenu
          checked={true}
          onToggle={onClose}
          size={42}
          strokeWidth={2.2}
          strokeColor="#FFFFFF"
        />
        <motion.button
          type="button"
          className="text-sm font-semibold sm:text-base text-white"
          onClick={onClose}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
        >
          Close
        </motion.button>
      </div>

      {/* Mobile language switcher - top left */}
      <motion.div
        className="absolute top-24 left-4 sm:hidden z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex gap-1 rounded-full bg-white/10 p-1 w-fit">
          {(['en', 'es'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                lang === l ? 'bg-white text-[#1a1a1a]' : 'text-white/50 hover:text-white'
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
        <div className="hidden w-36 shrink-0 flex-col justify-between py-10 md:flex lg:w-44">
          {/* Language switcher */}
          <div className="flex gap-1 rounded-full bg-white/10 p-1 w-fit">
            {(['en', 'es'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  lang === l ? 'bg-white text-[#1a1a1a]' : 'text-white/50 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-base font-semibold text-white">
            {socialMenuItems.map((item) => (
              <a key={item} href="#" className="relative flex cursor-pointer overflow-visible opacity-70 hover:opacity-100 transition-opacity">
                <TextRoll className="transition-colors">{item}</TextRoll>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-sm font-medium text-white opacity-50">
            {t.policyItems.map((item) => {
              const lower = item.toLowerCase();
              const href =
                lower.includes('privacy')   ? '/privacy-policy' :
                lower.includes('terms')     ? '/terms' :
                lower.includes('agreement') ? '/terms' :
                '#';
              return (
                <a key={item} href={href} className="transition-opacity hover:opacity-100">
                  {item}
                </a>
              );
            })}
          </div>
        </div>

        {/* Center column — main nav, vertically centered */}
        <div className="flex w-full md:w-auto shrink-0 flex-col items-start justify-center gap-0.5 text-[9vw] font-semibold leading-[0.95] tracking-tight sm:text-[7vw] md:text-[clamp(2.6rem,3.5vw,4.5rem)]">
          {t.menuItems.map((item) => {
            const lower = item.toLowerCase();
            const href =
              lower === 'home'        || lower === 'inicio'     ? '/' :
              lower === 'about'       || lower === 'nosotros'   ? '/about' :
              lower === 'services'    || lower === 'servicios'  ? '/services' :
              lower === 'packages'    || lower === 'paquetes'   ? '/packages' :
              lower === 'events'      || lower === 'eventos'    ? '/events' :
              lower === 'results'     || lower === 'resultados' ? '/results' :
              lower === 'blog'                                  ? '/blog' :
              lower === 'merchandise' || lower === 'mercancía'
                                      || lower === 'mercancia'
                                      || lower === 'merch'     ? '/merchandise' :
              lower === 'contact'     || lower === 'contacto'   ? '/contact' :
              '#';
            return (
            <a
              key={item}
              href={href}
              className="relative flex cursor-pointer overflow-visible text-white hover:opacity-60 transition-opacity"
            >
              <TextRoll center className="uppercase transition-colors">
                {item}
              </TextRoll>
            </a>
            );
          })}

          {/* Mobile social links — below nav items */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 md:hidden">
            {socialMenuItems.map((item) => (
              <a key={item} href="#" className="text-[3.5vw] sm:text-[2.8vw] font-semibold text-white opacity-60 hover:opacity-100 transition-opacity uppercase tracking-wide">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Right column — two stacked pricing-style cards */}
        <div className="hidden w-[42%] shrink-0 flex-col gap-3 justify-center py-10 ml-auto md:flex">

          {/* Events card */}
          <a
            href="/events"
            className="group flex flex-1 overflow-hidden rounded-2xl"
            style={{ backgroundColor: '#E6FF2B' }}
          >
            {/* Text side */}
            <div className="flex flex-col justify-between p-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/50 mb-3">
                  {t.latestEvents}
                </p>
                <p className="font-extrabold uppercase tracking-tight text-black leading-[0.95] text-lg">
                  Body By Brad<br />Events
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[#E6FF2B] text-xs font-bold transition-opacity group-hover:opacity-80">
                  ↗
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                  Register
                </span>
              </div>
            </div>

            {/* Image — floating inside card */}
            <div className="flex-1 min-w-0 p-3 flex">
              <div className="w-full overflow-hidden rounded-xl">
                <img
                  src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg"
                  alt="Body By Brad Events"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          </a>

          {/* Merchandise card */}
          <a
            href="/merchandise"
            className="group flex flex-1 overflow-hidden rounded-2xl"
            style={{ backgroundColor: '#E6FF2B' }}
          >
            {/* Text side */}
            <div className="flex flex-col justify-between p-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/50 mb-3">
                  {t.merchandiseLabel}
                </p>
                <p className="font-extrabold uppercase tracking-tight text-black leading-[0.95] text-lg">
                  New<br />Drops
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[#E6FF2B] text-xs font-bold transition-opacity group-hover:opacity-80">
                  ↗
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                  {t.shopNow}
                </span>
              </div>
            </div>

            {/* Image — floating inside card */}
            <div className="flex-1 min-w-0 p-3 flex">
              <div className="w-full overflow-hidden rounded-xl">
                <img
                  src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp"
                  alt="Body By Brad Merchandise"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          </a>

        </div>
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
          href="/contact"
          className="flex items-center justify-center gap-2 w-full bg-white text-[#1a1a1a] py-4 rounded-full font-bold text-sm uppercase tracking-wide"
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
  theme?: 'light' | 'dark';
};

export default function Navbar({
  isLoading,
  isMenuOpen,
  isScrolled,
  onMenuToggle,
  theme = 'light',
}: NavbarProps) {
  const { t, lang, setLang } = useLanguage();
  const { count: cartCount, open: openCart, hydrated } = useCart();
  const displayCount = hydrated ? cartCount : 0;
  const isDark = theme === 'dark' && !isMenuOpen;
  const heroFg = isDark ? '#0a0a0a' : '#FFFFFF';
  const heroTextClass = isDark ? 'text-black' : 'text-white';
  const heroLogoFilter = isDark
    ? 'brightness-0'
    : 'brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]';
  return (
    <>
      <AnimatePresence>
        {!isLoading && isMenuOpen && <MenuOverlay onClose={() => onMenuToggle(false)} />}
      </AnimatePresence>

      {/* Hero navbar — absolute, slides down after loading */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={isLoading ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="font-satoshi z-60 absolute top-0 left-0 right-0 px-4 pt-5 sm:px-7 sm:pt-7 md:px-12 md:pt-9 flex items-center justify-between"
      >
        <div className="flex flex-1 items-center justify-start gap-2 sm:gap-3">
          <HamburgerMenu
            checked={isMenuOpen}
            onToggle={onMenuToggle}
            size={42}
            strokeWidth={2.2}
            strokeColor={heroFg}
          />
          <AnimatePresence>
            {isMenuOpen && (
              <motion.button
                type="button"
                className={`text-sm font-semibold sm:text-base ${heroTextClass}`}
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
            className={`w-auto h-13 sm:h-15.5 md:h-18 ${heroLogoFilter}`}
          />
        </a>

        <div className="flex flex-1 items-center justify-end gap-5 sm:gap-6 md:gap-8">
          <button
            aria-label="Cart"
            onClick={openCart}
            className={`relative hover:opacity-70 transition-opacity cursor-pointer ${heroTextClass}`}
          >
            <IoCartOutline size={26} />
            {displayCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#DFF994] text-black text-[9px] font-bold flex items-center justify-center">
                {displayCount}
              </span>
            )}
          </button>
          <AuthSlot theme={theme === 'dark' && !isMenuOpen ? 'dark' : 'light'} />
          <a
            href="/contact"
            className={`hidden sm:flex items-center gap-1 font-semibold sm:gap-1.5 sm:text-sm md:text-lg ${heroTextClass}`}
          >
            <TextRoll className="whitespace-nowrap pb-[0.2em] pt-[0.1em]">{t.getStarted}</TextRoll>
            <span aria-hidden="true" className="text-lg leading-none md:text-xl">
              ↗
            </span>
          </a>
        </div>
      </motion.nav>

      {/* Floating navbar — slides in from top when scrolling upward, hidden when menu is open */}
      <AnimatePresence>
        {!isLoading && isScrolled && !isMenuOpen && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="font-satoshi z-60 fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 bg-[#191919] rounded-full shadow-lg px-6 py-4 flex items-center justify-between"
          >
            <div className="flex flex-1 items-center justify-start gap-2 sm:gap-3">
              <HamburgerMenu
                checked={isMenuOpen}
                onToggle={onMenuToggle}
                size={42}
                strokeWidth={2.2}
                strokeColor="#ffffff"
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
                className="w-auto h-10.5 sm:h-12 brightness-0 invert"
              />
            </a>

            <div className="flex flex-1 items-center justify-end gap-5 sm:gap-6 md:gap-8">
              <div className="hidden sm:flex gap-0.5 rounded-full bg-white/10 p-0.5">
                {(['en', 'es'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      lang === l ? 'bg-white text-[#191919]' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                aria-label="Cart"
                onClick={openCart}
                className="relative text-white hover:opacity-70 transition-opacity cursor-pointer"
              >
                <IoCartOutline size={26} />
                {displayCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E6FF2B] text-black text-[9px] font-bold flex items-center justify-center">
                    {displayCount}
                  </span>
                )}
              </button>
              <AuthSlot theme="light" />
              <a
                href="/contact"
                className="hidden sm:flex items-center gap-1 font-semibold text-white sm:gap-1.5 sm:text-sm md:text-lg"
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
