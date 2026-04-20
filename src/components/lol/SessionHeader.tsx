'use client';

import { LolSessionStatus } from '@/types/enums';
import { ChevronLeft, Share2, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface SessionHeaderProps {
  sessionId: string;
  status: LolSessionStatus;
  isConnected: boolean;
}

export function SessionHeader({ sessionId, status, isConnected }: SessionHeaderProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const getStatusColor = (status: LolSessionStatus) => {
    switch (status) {
      case 'WAITING': return 'text-neon-mint bg-neon-mint/10 border-neon-mint/20';
      case 'BALANCING': return 'text-neon-purple bg-neon-purple/10 border-neon-purple/20';
      case 'FINISHED': return 'text-muted-gray bg-white/5 border-white/10';
      default: return 'text-muted-gray bg-white/5 border-white/10';
    }
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => router.back()}
          className="h-14 w-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all group active:scale-95"
        >
          <ChevronLeft className="h-6 w-6 text-[#5A5A65] group-hover:text-white transition-colors" />
        </button>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none font-barlow">
              Custom Match
            </h1>
            <div className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all duration-500",
              getStatusColor(status)
            )}>
              {status}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#5A5A65] uppercase tracking-[0.2em]">
              Session ID: <span className="text-white/40">{sessionId}</span>
            </span>
            <div className="h-1 w-1 rounded-full bg-white/10" />
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-2 w-2 rounded-full transition-all duration-500",
                isConnected 
                  ? "bg-neon-mint shadow-[0_0_10px_rgba(110,231,183,0.8)]" 
                  : "bg-ruby/30 animate-pulse"
              )} />
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors duration-500",
                isConnected ? "text-neon-mint/70" : "text-ruby/50"
              )}>
                {isConnected ? 'Live Connected' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
         <div className="hidden md:flex flex-col items-end gap-1 px-6 border-r border-white/5">
            <span className="text-[10px] font-bold text-[#5A5A65] uppercase tracking-[0.2em]">Region</span>
            <span className="text-sm font-black text-white uppercase tracking-tight italic text-glow-mint">KR Seoul</span>
         </div>
         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-2xl transition-all hover:border-neon-mint/30 hover:bg-neon-mint/5 group">
            <Activity className="h-6 w-6 text-muted-gray group-hover:text-neon-mint transition-colors" />
         </div>
      </div>
    </div>
  );
}
