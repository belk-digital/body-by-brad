import { Suspense } from 'react';
import Link from 'next/link';
import SignInForm from './SignInForm';

const IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139268/IMG_3044_vsxjow.jpg';

export default function SignInPage() {
  return (
    <main className="font-satoshi min-h-dvh flex">

      {/* ── Left — form ─────────────────────────────────────────────────── */}
      <div className="relative flex w-full flex-col justify-center bg-[#1A1A1A] px-8 py-16 md:w-[45%] lg:w-[40%]">

        {/* Back link */}
        <Link
          href="/"
          className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          ← Back to site
        </Link>

        {/* Logo mark */}
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
            <span className="text-[9px] font-black text-[#1A1A1A] leading-none">B</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6FF2B]">
            Body By Brad
          </span>
        </div>

        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>

      {/* ── Right — photo ────────────────────────────────────────────────── */}
      <div className="relative hidden flex-1 md:block">
        <img
          src={IMAGE}
          alt="Body By Brad community training"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        {/* Bottom branding */}
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B] mb-2">
            Charleston, SC
          </p>
          <h2 className="font-extrabold uppercase text-white leading-none text-4xl lg:text-5xl">
            WHERE EFFORT
            <br />
            BECOMES
            <br />
            TRANSFORMATION
          </h2>
        </div>
      </div>

    </main>
  );
}
