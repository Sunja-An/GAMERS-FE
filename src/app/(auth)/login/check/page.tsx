'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { authApi } from '@/api/auth';

/**
 * LoginCheckPage serves as a synonym for LoginSuccessPage.
 * It also handles the edge case where the frontend might receive the 
 * Discord OAuth2 code directly (if the backend is configured that way).
 */
export default function LoginCheckPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCheck = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      // 1. If code and state are present, the frontend acts as the callback handler
      if (code && state) {
        try {
          const response = await authApi.discordCallback(code, state);
          if (response && response.tokens) {
            // Set tokens in cookies as fallback if backend didn't set them via Set-Cookie
            Cookies.set('access_token', response.tokens.access_token, { expires: 1 });
            Cookies.set('refresh_token', response.tokens.refresh_token, { expires: 7 });
            
            // Check for is_new_user (might be in response or cookie)
            const isNewUser = Cookies.get('is_new_user') === 'true';
            
            if (isNewUser) {
              router.push('/onboarding');
            } else {
              router.push('/');
            }
            return;
          }
        } catch (err: any) {
          console.error('Discord callback error:', err);
          setError(err.message || 'Authentication failed during callback');
          setIsProcessing(false);
          return;
        }
      }

      // 2. If no code/state, behave like success page (check cookies set by backend)
      const timer = setTimeout(() => {
        const isNewUser = Cookies.get('is_new_user') === 'true';
        if (isNewUser) {
          router.push('/onboarding');
        } else {
          router.push('/');
        }
      }, 1000);

      return () => clearTimeout(timer);
    };

    handleCheck();
  }, [router, searchParams]);

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
        <div className="absolute inset-0 bg-[#6EE7B7] blur-[100px] opacity-20 animate-pulse" />
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 border-2 border-[#6EE7B7]/20 rounded-full animate-[ping_3s_linear_infinite]" />
          <div className="w-16 h-16 bg-[#1A1A20] border border-[#24242B] rounded-2xl flex items-center justify-center z-10 shadow-2xl">
            <Loader2 className="w-8 h-8 text-[#6EE7B7] animate-spin" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-3 relative z-10">
        <h1 className="text-[#EEEEF0] font-barlow font-black text-3xl uppercase tracking-tighter italic">
          VERIFYING
        </h1>
        <p className="text-[#7A7A85] font-inter text-sm font-medium tracking-wide">
          {t('auth.login.check_loading', 'Finalizing authentication...')}
        </p>
      </div>
    </div>
  );
}
