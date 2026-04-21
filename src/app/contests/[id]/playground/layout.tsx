'use client';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { PlaygroundNavbar } from '@/components/playground/PlaygroundNavbar';
import { PlaygroundHeader } from '@/components/playground/PlaygroundHeader';
import { PlaygroundSubNav } from '@/components/playground/PlaygroundSubNav';
import { Loader2 } from 'lucide-react';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-[#EEEEF0] selection:bg-neon-mint/30">
      <PlaygroundNavbar />
      <PlaygroundHeader 
        title={t('contests.single.mock.title')}
        game="Valorant"
        host="GMS_Creator"
        timeLeft="01:23:45"
      />
      <Suspense fallback={
        <div className="h-14 border-b border-[#1A1A20] flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[#6EE7B7]" />
        </div>
      }>
        <PlaygroundSubNav />
      </Suspense>
      {children}
    </div>
  );
}
