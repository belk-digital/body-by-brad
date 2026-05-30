'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const SC_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d432918.2!2d-80.1!3d32.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe7a42d49b3b87%3A0x88fe7a42d49b3b87!2sCharleston%2C%20SC!5e0!3m2!1sen!2sus!4v1716000000000';

export default function ContactDetailsSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };

  const itemReveal: Variants = {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  const contacts = [
    {
      Icon: Mail,
      value: t.contactEmailValue,
      label: t.contactEmailLabel,
      href: `mailto:${t.contactEmailValue}`,
    },
    {
      Icon: Phone,
      value: t.contactPhoneNumber,
      label: t.contactPhoneLabel,
      href: `tel:${t.contactPhoneNumber.replace(/[\s()+-]/g, '')}`,
    },
    {
      Icon: MapPin,
      value: t.contactStudioAddress.join(', '),
      label: t.contactStudioLabel,
      href: null,
    },
  ];

  return (
    <section ref={ref} className="relative w-full bg-white">
      <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
        {/* Map — left ~58% */}
        <div className="w-full md:w-[58%] h-[280px] md:h-auto">
          <iframe
            title="Body By Brad — Charleston, South Carolina"
            src={SC_MAP_EMBED}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* Contact info cards — right ~42% */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full md:w-[42%] flex flex-col divide-y divide-gray-200 border-t border-gray-200 md:border-t-0 md:border-l md:border-gray-200"
        >
          {contacts.map(({ Icon, value, label, href }) => (
            <motion.div
              key={label}
              variants={itemReveal}
              className="flex items-center gap-5 px-8 py-9 md:px-10 md:py-10"
            >
              <div className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              </div>
              <div>
                {href ? (
                  <a
                    href={href}
                    className="font-semibold text-gray-900 text-sm md:text-base hover:text-[#007AE5] transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-semibold text-gray-900 text-sm md:text-base">{value}</p>
                )}
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
