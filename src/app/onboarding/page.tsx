'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Trophy, Users, UserCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function OnboardingPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const features = [
    {
      icon: <UserCircle className="w-5 h-5 text-[#6EE7B7]" />,
      title: t('onboarding.features.profile'),
    },
    {
      icon: <Trophy className="w-5 h-5 text-[#6EE7B7]" />,
      title: t('onboarding.features.contest'),
    },
    {
      icon: <Users className="w-5 h-5 text-[#6EE7B7]" />,
      title: t('onboarding.features.community'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0F] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6EE7B7] blur-[150px] opacity-[0.03] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5EEAD4] blur-[150px] opacity-[0.03] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 mb-4"
          >
            <Check className="w-8 h-8 text-[#6EE7B7]" />
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-[#EEEEF0] font-barlow font-black text-4xl uppercase tracking-tight leading-[1.1]">
              {t('onboarding.title')}
            </h1>
            <p className="text-[#6EE7B7] font-barlow font-bold text-lg uppercase tracking-widest">
              {t('onboarding.subtitle')}
            </p>
          </div>
          
          <p className="text-[#7A7A85] font-inter text-sm max-w-[320px] mx-auto leading-relaxed">
            {t('onboarding.description')}
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1A1A20] border border-[#24242B] group hover:border-[#6EE7B7]/30 transition-all cursor-default"
            >
              <div className="shrink-0 p-2 rounded-lg bg-[#24242B] group-hover:bg-[#6EE7B7]/10 transition-colors">
                {feature.icon}
              </div>
              <span className="text-[#EEEEF0] font-inter text-sm font-semibold">
                {feature.title}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <Button 
            onClick={() => router.push('/')}
            className="w-full bg-[#6EE7B7] hover:bg-[#5EEAD4] text-[#0C0C0F] font-black h-12 text-base uppercase tracking-wider group rounded-xl shadow-[0_0_20px_rgba(110,231,183,0.15)] hover:shadow-[0_0_30px_rgba(110,231,183,0.25)] transition-all"
          >
            {t('onboarding.cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
