import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0F]">
        <Loader2 className="h-12 w-12 animate-spin text-[#6EE7B7]" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
