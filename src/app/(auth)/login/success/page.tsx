'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';

export default function LoginSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const isNewUser = Cookies.get('is_new_user') === 'true';
    
    // Explicitly remove the cookie after reading as recommended
    Cookies.remove('is_new_user', { path: '/', domain: '.gamers.io.kr' });
    // Also try removing without domain/path just in case
    Cookies.remove('is_new_user');

    if (isNewUser) {
      router.push('/onboarding');
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0C0C0F] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-[#6EE7B7] blur-3xl opacity-10 animate-pulse" />
        <Loader2 className="w-12 h-12 text-[#6EE7B7] animate-spin relative z-10" />
      </div>
      <div className="text-center space-y-2 relative z-10">
        <h1 className="text-[#EEEEF0] font-barlow font-black text-2xl uppercase tracking-tight">
          인증 완료 중
        </h1>
        <p className="text-[#7A7A85] font-inter text-sm font-medium">
          잠시만 기다려주세요, 도메인 정보를 불러오고 있습니다.
        </p>
      </div>
    </div>
  );
}
