import { Suspense } from 'react';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
  return (
    <main className="font-satoshi min-h-dvh flex items-center justify-center bg-[#f5f0e1] px-4 py-12">
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
