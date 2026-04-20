'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Lock, Trash2, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createChangePasswordSchema } from '@/lib/validations/user';
import { useChangePassword, useDeleteAccount } from '@/hooks/use-user';
import { useUser } from '@/hooks/use-auth';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { data: user } = useUser();
  const { mutate: changePassword, isPending: isUpdatingPassword, isSuccess: isUpdateSuccess } = useChangePassword();
  const { mutate: deleteAccount, isPending: isDeletingAccount } = useDeleteAccount();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const passwordSchema = React.useMemo(() => createChangePasswordSchema(t), [t]);
  type PasswordFormValues = import('zod').infer<typeof passwordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordSubmit = (data: PasswordFormValues) => {
    if (!user) return;
    changePassword(
      { id: user.id, data: { password: data.password } },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    deleteAccount(user.id);
  };

  return (
    <main className="min-h-screen bg-[#060608] pt-32 pb-20">
      <div className="max-w-[720px] mx-auto px-6">
        {/* Back Link */}
        <Link 
          href="/mypage" 
          className="flex items-center gap-2 text-[#7A7A85] hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">{t('common.back')}</span>
        </Link>

        <div className="space-y-4 mb-10">
          <h1 className="text-4xl font-black text-[#EEEEF0] tracking-tight uppercase">
            {t('mypage.settings.title', '계정 설정')}
          </h1>
          <p className="text-[#7A7A85] font-medium">
            {t('mypage.settings.subtitle', '보안 및 계정 관리를 수행할 수 있습니다.')}
          </p>
        </div>

        <div className="space-y-8">
          {/* Section: Password Change */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-[#0C0C0F] border border-white/5 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-neon-mint/10 flex items-center justify-center text-neon-mint">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-[#EEEEF0]">{t('mypage.settings.password_change.title')}</h2>
            </div>

            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#7A7A85] ml-1">
                    {t('mypage.settings.password_change.new_password')}
                  </label>
                  <Input
                    {...register('password')}
                    type="password"
                    className="bg-[#060608] border-white/5 focus:border-neon-mint/30 h-12"
                  />
                  {errors.password && (
                    <p className="text-[10px] text-red-500 ml-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#7A7A85] ml-1">
                    {t('mypage.settings.password_change.confirm_password')}
                  </label>
                  <Input
                    {...register('confirmPassword')}
                    type="password"
                    className="bg-[#060608] border-white/5 focus:border-neon-mint/30 h-12"
                  />
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-red-500 ml-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {isUpdateSuccess && (
                <div className="flex items-center gap-2 text-neon-mint bg-neon-mint/10 p-3 rounded-lg border border-neon-mint/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold">{t('mypage.settings.password_change.success')}</span>
                </div>
              )}

              <Button 
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full md:w-auto px-10 h-12 bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/5"
              >
                {isUpdatingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : t('common.save')}
              </Button>
            </form>
          </motion.section>

          {/* Section: Danger Zone (Account Deletion) */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-[#0C0C0F] border border-red-500/10 p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-[#EEEEF0]">{t('mypage.settings.account_deletion.title')}</h2>
            </div>
            
            <p className="text-sm text-[#7A7A85] mb-8 leading-relaxed">
              {t('mypage.settings.account_deletion.description')}
            </p>

            {showDeleteConfirm ? (
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-red-500 mb-1">{t('mypage.settings.account_deletion.confirm')}</h4>
                    <p className="text-xs text-red-500/70">{t('mypage.settings.account_deletion.warning_desc', '이 작업은 되돌릴 수 없으며 모든 개인 데이터와 대회 전적이 삭제됩니다.')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white h-11"
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button 
                    onClick={handleDeleteAccount}
                    disabled={isDeletingAccount}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white h-11"
                  >
                    {isDeletingAccount ? <Loader2 className="w-4 h-4 animate-spin" /> : t('mypage.settings.account_deletion.button')}
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setShowDeleteConfirm(true)}
                variant="destructive" 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold px-8 h-11"
              >
                {t('mypage.settings.account_deletion.button')}
              </Button>
            )}
          </motion.section>
        </div>
      </div>
    </main>
  );
}
