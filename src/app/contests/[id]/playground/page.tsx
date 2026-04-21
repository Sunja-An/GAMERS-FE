'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { PlaygroundOverview } from '@/components/playground/PlaygroundOverview';
import { PlaygroundTeamManagement } from '@/components/playground/PlaygroundTeamManagement';
import { PlaygroundNotice } from '@/components/playground/PlaygroundNotice';
import { Loader2 } from 'lucide-react';

function PlaygroundContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';

  return (
    <>
      {tab === 'overview' && <PlaygroundOverview />}
      {tab === 'team' && <PlaygroundTeamManagement />}
      {tab === 'notice' && <PlaygroundNotice />}
      {/* Other tabs can be added here */}
      {!['overview', 'team', 'notice'].includes(tab) && (
        <div className="flex h-[60vh] items-center justify-center text-[#5A5A65]">
          {t('playground.header.under_construction')}
        </div>
      )}
    </>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#6EE7B7]" />
      </div>
    }>
      <PlaygroundContent />
    </Suspense>
  );
}
