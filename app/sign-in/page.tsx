import { Suspense } from 'react';
import SignInForm from './SignInForm';

export default function SignInPage() {
  return (
    <main className="font-satoshi min-h-dvh flex items-center justify-center bg-[#f5f0e1] px-4 py-12">
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
