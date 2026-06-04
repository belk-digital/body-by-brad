'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-bold uppercase tracking-tight text-zinc-950 text-xl mb-4">{title}</h2>
      <div className="space-y-3 text-zinc-500 text-[15px] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {children}
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-7 md:px-12">
      <div className="max-w-3xl mx-auto">

        <div className="mb-12 pb-8 border-b border-zinc-100">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 mb-2">Last updated: May 30, 2026</p>
          <p className="text-zinc-500 text-base leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
            This Privacy Policy explains how Body By Brad (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated by Brad&apos;s Fitness LLC in Charleston, SC, collects, uses, and protects your personal information when you use our website and services.
          </p>
        </div>

        <PolicySection title="1. Information We Collect">
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Name and email address when you register or contact us</li>
            <li>Billing and payment information processed securely through Stripe</li>
            <li>Health and fitness data you voluntarily provide (age, weight, height, fitness goals)</li>
            <li>Account credentials managed through our authentication provider</li>
            <li>Communications between you and our coaching team</li>
          </ul>
          <p>We also automatically collect certain technical data when you visit our website, including IP address, browser type, pages viewed, and referring URLs via standard server logs.</p>
        </PolicySection>

        <PolicySection title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Provide, personalize, and improve our training and coaching services</li>
            <li>Process payments and manage your subscription</li>
            <li>Communicate with you about your program, progress, and updates</li>
            <li>Send service-related notifications and, where permitted, marketing emails</li>
            <li>Comply with legal obligations and protect against fraudulent activity</li>
          </ul>
        </PolicySection>

        <PolicySection title="3. Third-Party Services">
          <p>We work with trusted third-party providers who may access your data only as needed to deliver our services:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-zinc-700">Stripe</strong> — Payment processing. Your card details are never stored on our servers.</li>
            <li><strong className="text-zinc-700">Supabase</strong> — Secure cloud database for storing account and program data.</li>
            <li><strong className="text-zinc-700">Cloudinary</strong> — Media hosting for images and transformation photos.</li>
            <li><strong className="text-zinc-700">Vercel</strong> — Website hosting and delivery infrastructure.</li>
          </ul>
          <p>Each provider is bound by their own privacy policies and applicable data protection laws.</p>
        </PolicySection>

        <PolicySection title="4. Data Retention">
          <p>We retain your personal data for as long as your account is active or as needed to provide services. If you cancel your account, we will delete or anonymize your personal data within 90 days, unless we are required to retain it for legal or compliance purposes.</p>
        </PolicySection>

        <PolicySection title="5. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Access, correct, or delete your personal information</li>
            <li>Object to or restrict how we process your data</li>
            <li>Request a portable copy of your data</li>
            <li>Withdraw consent at any time where processing is based on consent</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:hello@bodybybrad.com" className="text-zinc-950 underline hover:no-underline">hello@bodybybrad.com</a>.</p>
        </PolicySection>

        <PolicySection title="6. Cookies">
          <p>Our website uses cookies and similar technologies to maintain session state, remember your preferences, and analyze site traffic. You can control cookies through your browser settings. Disabling cookies may affect certain features of the site.</p>
        </PolicySection>

        <PolicySection title="7. Children's Privacy">
          <p>Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.</p>
        </PolicySection>

        <PolicySection title="8. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
        </PolicySection>

        <PolicySection title="9. Contact Us">
          <p>If you have any questions or concerns about this Privacy Policy, please reach out:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Email: <a href="mailto:hello@bodybybrad.com" className="text-zinc-950 underline hover:no-underline">hello@bodybybrad.com</a></li>
            <li>Location: Charleston, SC, United States</li>
            <li>Website: <a href="/contact" className="text-zinc-950 underline hover:no-underline">Contact form</a></li>
          </ul>
        </PolicySection>

      </div>
    </section>
  );
}

function PageContent() {
  const [isLoading,  setIsLoading]  = useState(true);
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

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden font-satoshi">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      <section className="relative h-[50dvh] min-h-[340px] w-full overflow-hidden bg-black">
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
          theme="light"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-7 md:px-12 pb-10 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6FF2B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Legal</span>
            </div>
            <h1 className="font-extrabold uppercase text-white leading-none" style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}>
              PRIVACY<br />POLICY
            </h1>
          </motion.div>
        </div>
      </section>

      <PrivacyContent />
      <Footer />
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <ReactLenis root>
      <PageContent />
    </ReactLenis>
  );
}
