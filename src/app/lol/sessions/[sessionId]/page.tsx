'use client';

import { useParams } from 'next/navigation';
import { useLolSession } from '@/hooks/use-lol-session';
import { useLolSessionWs } from '@/hooks/use-lol-session-ws';
import { SessionHeader } from '@/components/lol/SessionHeader';
import { PlayerCard } from '@/components/lol/PlayerCard';
import { InviteSection } from '@/components/lol/InviteSection';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SessionPage() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const { data: session, isLoading, error, refetch } = useLolSession(sessionId);
  const { isConnected } = useLolSessionWs(sessionId);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0C0C0D] gap-6">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-neon-mint/20 rounded-full animate-pulse" />
          <Loader2 className="relative h-12 w-12 animate-spin text-neon-mint" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-black text-white/40 uppercase tracking-[0.3em] animate-pulse">
            Loading Session
          </p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0C0C0D] gap-8 px-6 text-center">
        <div className="h-24 w-24 rounded-full bg-ruby/10 border border-ruby/20 flex items-center justify-center">
           <AlertCircle className="h-10 w-10 text-ruby" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Session Not Found</h2>
          <p className="text-muted-gray max-w-xs mx-auto text-sm leading-relaxed">
            The session might have been cancelled or the ID is incorrect. Please check your link.
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/community'}
          className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-sm font-black uppercase tracking-widest text-[#EEEEF0] hover:bg-white/10 transition-all active:scale-95"
        >
          Return to community
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0D] text-white selection:bg-neon-mint selection:text-black">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <SessionHeader 
            sessionId={session.session_id} 
            status={session.status} 
            isConnected={isConnected} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content: Player List */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-neon-mint shadow-2xl">
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-black uppercase tracking-tight italic">
                        Joined Players
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-neon-mint uppercase tracking-widest px-2 py-0.5 rounded bg-neon-mint/10 border border-neon-mint/20">
                          {session.players.length} / 10
                        </span>
                        <span className="text-[10px] font-bold text-[#5A5A65] uppercase tracking-widest">
                          Minimum 10 players required for balance
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => refetch()}
                    className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-[#5A5A65] hover:text-white transition-all active:rotate-180"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AnimatePresence mode="popLayout">
                    {session.players.map((player, idx) => (
                      <motion.div
                        key={player.user_id || idx}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <PlayerCard player={player} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Empty Slots */}
                  {Array.from({ length: Math.max(0, 10 - session.players.length) }).map((_, idx) => (
                    <div 
                      key={`empty-${idx}`}
                      className="h-[84px] rounded-3xl border-2 border-dashed border-white/[0.03] flex items-center justify-center opacity-30"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5A5A65]">
                        Waiting for join
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Invites & Info */}
            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest italic flex items-center gap-3">
                    <span className="h-px w-8 bg-white/20" />
                    Invite Controls
                 </h3>
                 <InviteSection 
                   inviteCode={session.invite_code} 
                   sessionUrl={session.session_url} 
                 />
              </div>

              {/* Session Tips / Status */}
              <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-4">
                 <h4 className="text-xs font-black text-[#5A5A65] uppercase tracking-widest">Session Guidelines</h4>
                 <ul className="space-y-3">
                    {[
                      'Invite at least 10 players to start balancing',
                      'Only the Host can execute the balance command',
                      'Connection status is shown at the top left',
                    ].map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-[11px] font-medium text-muted-gray group">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/20 mt-1.5 transition-colors group-hover:bg-neon-mint" />
                        {tip}
                      </li>
                    ))}
                 </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
