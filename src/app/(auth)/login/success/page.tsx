'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LoginSuccessPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Small delay to ensure cookies are settled and provide a smooth transition
    const timer = setTimeout(() => {
      const accessToken = Cookies.get('access_token');
      const isNewUser = Cookies.get('is_new_user') === 'true';
      
      // If we don't have an access token, something went wrong with the backend redirect
      if (!accessToken && !isNewUser) {
        // Technically access_token is HttpOnly, so JS can't see it if the backend followed the pipeline exactly.
        // But the pipeline says JS reads is_new_user.
        // If is_new_user is missing, and we can't see access_token (which we shouldn't), 
        // we should assume success but wait for the session to be verified by a protected call or the AuthProvider.
        // However, if we are on this page, it's because the backend sent us here.
      }

      if (isNewUser) {
        router.push('/onboarding');
      } else {
        router.push('/');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0C0C0F] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-sm w-full text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-white font-bold text-lg">{t('auth.error.title', 'Authentication Error')}</h2>
          <p className="text-[#7A7A85] text-sm">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors"
          >
            {t('auth.login.title', 'Go to Login')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0F] flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-[#6EE7B7] blur-[100px] opacity-20 animate-pulse" />
        
        {/* Animated Rings */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 border-2 border-[#6EE7B7]/20 rounded-full animate-[ping_3s_linear_infinite]" />
          <div className="absolute w-20 h-20 border-2 border-[#6EE7B7]/40 rounded-full animate-[ping_2s_linear_infinite]" />
          <div className="w-16 h-16 bg-[#1A1A20] border border-[#24242B] rounded-2xl flex items-center justify-center z-10 shadow-2xl">
            <Loader2 className="w-8 h-8 text-[#6EE7B7] animate-spin" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-3 relative z-10">
        <h1 className="text-[#EEEEF0] font-barlow font-black text-3xl uppercase tracking-tighter italic">
          AUTHENTICATING
        </h1>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[#7A7A85] font-inter text-sm font-medium tracking-wide">
            {t('auth.login.success_loading', 'Syncing your profile data...')}
          </p>
          <div className="w-48 h-1 bg-[#1A1A20] rounded-full overflow-hidden mt-4">
            <div className="h-full bg-gradient-to-r from-[#6EE7B7] to-[#34D399] w-1/2 animate-[loading_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

