'use client';

import { useState } from 'react';
import { Copy, Check, Link as LinkIcon, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface InviteSectionProps {
  inviteCode: string;
  sessionUrl: string;
}

export function InviteSection({ inviteCode, sessionUrl }: InviteSectionProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const copyToClipboard = async (text: string, setter: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-7 rounded-[32px] bg-[#141418] border border-white/5 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
        <LinkIcon className="h-24 w-24 text-neon-mint -rotate-12" />
      </div>

      <div className="relative z-10 space-y-5">
        <div className="space-y-1">
          <h3 className="text-[13px] font-black text-white uppercase tracking-[0.1em] flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-neon-mint" />
            Invite Link
          </h3>
          <p className="text-[11px] font-medium text-muted-gray uppercase tracking-wider">
            Share this link to invite others
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 h-14 px-5 rounded-2xl bg-black/40 border border-white/5 flex items-center overflow-hidden group/link">
            <span className="text-[13px] font-bold text-muted-gray truncate group-hover/link:text-white transition-colors">
              {sessionUrl}
            </span>
          </div>
          <Button
            onClick={() => copyToClipboard(sessionUrl, setCopiedUrl)}
            className="h-14 w-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 bg-white/5 hover:bg-white/10 border border-white/5"
          >
            <AnimatePresence mode="wait">
              {copiedUrl ? (
                <motion.div key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Check className="h-5 w-5 text-neon-mint" />
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Copy className="h-5 w-5 text-muted-gray" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="space-y-1">
          <h3 className="text-[13px] font-black text-white uppercase tracking-[0.1em] flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_8px_rgba(110,231,183,0.5)]" />
            Invite Code
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-16 px-6 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center group/code">
            <span className="text-2xl font-black text-white tracking-[0.25em] group-hover/code:text-neon-mint transition-colors cursor-default">
              {inviteCode}
            </span>
          </div>
          <Button
            onClick={() => copyToClipboard(inviteCode, setCopiedCode)}
            className="h-16 w-16 rounded-2xl flex items-center justify-center transition-all active:scale-95 bg-white/5 hover:bg-white/10 border border-white/5"
          >
            <AnimatePresence mode="wait">
              {copiedCode ? (
                <motion.div key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Check className="h-6 w-6 text-neon-mint" />
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Copy className="h-6 w-6 text-muted-gray" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  );
}
