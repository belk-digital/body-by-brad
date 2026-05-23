import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-[#f5f0e1] px-4 py-12">
      <SignUp />
    </main>
  );
}
