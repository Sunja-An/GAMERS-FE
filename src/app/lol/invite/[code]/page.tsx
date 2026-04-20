'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { lolSessionApi } from '@/api/lol-session';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function InviteRedirectPage() {
  const params = useParams();
  const code = params?.code as string;
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!code) return;

    const fetchAndRedirect = async () => {
      try {
        const response = await lolSessionApi.getInviteInfo(code);
        if (response.session_url) {
          // Internal redirection based on the session_url path
          // If session_url is absolute (e.g. /lol/sessions/abc), it works with router.replace
          router.replace(response.session_url);
        } else if (response.session_id) {
          router.replace(`/lol/sessions/${response.session_id}`);
        } else {
          router.replace('/community');
        }
      } catch (err) {
        console.error('Failed to resolve invite code:', err);
        router.replace('/community');
      }
    };

    fetchAndRedirect();
  }, [code, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-deep-black text-[#EEEEF0] gap-6">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-neon-mint/20 rounded-full" />
        <Loader2 className="relative h-12 w-12 animate-spin text-neon-mint" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-lg font-black text-white tracking-tight uppercase italic">
          Joining Session...
        </p>
        <p className="text-xs font-medium text-muted-gray uppercase tracking-widest">
          {t('common.loading')}
        </p>
      </div>
    </div>
  );
}
