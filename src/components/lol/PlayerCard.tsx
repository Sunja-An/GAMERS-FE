'use client';

import { LolPlayer } from '@/types/lol';
import { Crown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: LolPlayer;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-3xl bg-[#141418]/50 border border-white/5 transition-all hover:bg-[#1A1A20] hover:border-neon-mint/20 hover:translate-x-1 group">
      <div className="relative">
        <div className="h-14 w-14 rounded-2xl bg-neon-mint/10 border border-neon-mint/20 overflow-hidden flex items-center justify-center">
          {player.profile_icon_id ? (
            <img 
              src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/profileicon/${player.profile_icon_id}.png`}
              alt={player.username}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
            />
          ) : (
            <User className="h-7 w-7 text-neon-mint opacity-50" />
          )}
        </div>
        {player.is_host && (
          <div className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-[#0C0C0D] border border-neon-mint/40 flex items-center justify-center shadow-2xl z-10">
            <Crown className="h-3.5 w-3.5 text-neon-mint" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[17px] font-black text-white truncate leading-none tracking-tight">
            {player.username}
          </span>
          <span className="text-[11px] font-bold text-[#5A5A65] uppercase tracking-wider">
            #{player.tag}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <div className={cn(
            "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider",
            "bg-neon-mint/10 text-neon-mint border border-neon-mint/20"
          )}>
            {player.tier} {player.rank}
          </div>
          {player.is_host && (
            <span className="text-[10px] font-bold text-muted-gray uppercase tracking-widest opacity-50">
              Host
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
