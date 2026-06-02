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

function TermsContent() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-7 md:px-12">
      <div className="max-w-3xl mx-auto">

        <div className="mb-12 pb-8 border-b border-zinc-100">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 mb-2">Last updated: May 30, 2026</p>
          <p className="text-zinc-500 text-base leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
            These Terms of Use govern your access to and use of the Body By Brad website and services. By accessing our site or enrolling in any program, you agree to be bound by these terms. Please read them carefully.
          </p>
        </div>

        <PolicySection title="1. Acceptance of Terms">
          <p>By using the Body By Brad website or purchasing any service, you confirm that you are at least 18 years of age and legally capable of entering into binding agreements. If you do not agree to these terms, please do not use our services.</p>
        </PolicySection>

        <PolicySection title="2. Services">
          <p>Body By Brad offers personal training, group fitness classes, online coaching programs, and related wellness services based in Charleston, SC. Services may be delivered in-person or remotely depending on the selected program.</p>
          <p>We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice to existing clients.</p>
        </PolicySection>

        <PolicySection title="3. Account Registration">
          <p>To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. Notify us immediately of any unauthorized use at <a href="mailto:hello@bodybybrad.com" className="text-zinc-950 underline hover:no-underline">hello@bodybybrad.com</a>.</p>
        </PolicySection>

        <PolicySection title="4. Payment & Billing">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All coaching programs are billed on a monthly subscription basis unless otherwise stated.</li>
            <li>Payments are processed securely through Stripe. By providing payment details, you authorize recurring charges.</li>
            <li>All prices are listed in USD and are exclusive of any applicable taxes.</li>
            <li>We reserve the right to update pricing with 30 days&apos; notice to active subscribers.</li>
          </ul>
        </PolicySection>

        <PolicySection title="5. Cancellation Policy">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-zinc-700">Online coaching:</strong> Cancel anytime before your next billing cycle. No refunds are issued for the current billing period.</li>
            <li><strong className="text-zinc-700">In-person sessions:</strong> Cancellations must be made at least 24 hours in advance. Late cancellations or no-shows may be charged in full.</li>
            <li><strong className="text-zinc-700">Events:</strong> Event registrations are non-refundable unless the event is cancelled by Body By Brad.</li>
          </ul>
        </PolicySection>

        <PolicySection title="6. Health & Safety Disclaimer">
          <p>Our programs involve physical exercise that carries inherent risk of injury. By participating, you confirm that:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You are in adequate physical condition to engage in the recommended activities.</li>
            <li>You have consulted or will consult a physician if you have any medical conditions, injuries, or concerns.</li>
            <li>You understand that Body By Brad is not a licensed medical provider and that our advice does not constitute medical guidance.</li>
          </ul>
          <p>You assume full responsibility for your health and safety during training. Body By Brad, its coaches, and affiliates are not liable for any injury, illness, or damage arising from participation in our programs.</p>
        </PolicySection>

        <PolicySection title="7. Intellectual Property">
          <p>All content on the Body By Brad website — including training programs, videos, images, text, and branding — is owned by or licensed to Body By Brad and protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works without prior written permission.</p>
        </PolicySection>

        <PolicySection title="8. Merchandise">
          <p>All merchandise purchases are final. We accept returns or exchanges only for defective or incorrectly shipped items within 14 days of delivery. Please contact us with your order details and photos of the issue to initiate a return.</p>
        </PolicySection>

        <PolicySection title="9. Limitation of Liability">
          <p>To the fullest extent permitted by law, Body By Brad shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our services or website. Our total liability for any claim shall not exceed the amount paid by you in the 30 days prior to the claim.</p>
        </PolicySection>

        <PolicySection title="10. Governing Law">
          <p>These Terms are governed by the laws of the State of South Carolina, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Charleston County, South Carolina.</p>
        </PolicySection>

        <PolicySection title="11. Changes to These Terms">
          <p>We may update these Terms of Use at any time. Continued use of our services after changes constitutes acceptance of the revised terms. We will notify active subscribers of material changes via email or an in-app notice.</p>
        </PolicySection>

        <PolicySection title="12. Contact">
          <p>For any questions about these Terms, please contact us:</p>
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
              TERMS<br />OF USE
            </h1>
          </motion.div>
        </div>
      </section>

      <TermsContent />
      <Footer />
    </div>
  );
}

export default function TermsPage() {
  return (
    <ReactLenis root>
      <PageContent />
    </ReactLenis>
  );
}
