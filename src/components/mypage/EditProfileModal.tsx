'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Hash, FileText, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createUpdateProfileSchema } from '@/lib/validations/user';
import { useUpdateProfile } from '@/hooks/use-user';
import { User as UserType } from '@/types/auth';

interface EditProfileModalProps {
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ user, isOpen, onClose }: EditProfileModalProps) {
  const { t } = useTranslation();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const updateProfileSchema = React.useMemo(() => createUpdateProfileSchema(t), [t]);
  type UpdateProfileValues = import('zod').infer<typeof updateProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user.username,
      tag: user.tag,
      bio: user.bio || '',
    },
  });

  // Reset form when user data changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      reset({
        username: user.username,
        tag: user.tag,
        bio: user.bio || '',
      });
    }
  }, [isOpen, user, reset]);

  const onSubmit = (data: UpdateProfileValues) => {
    updateProfile(
      { id: user.id, data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#141418] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h3 className="text-lg font-black text-[#EEEEF0] tracking-tight uppercase">
                {t('mypage.edit_profile_title', '프로필 수정')}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-[#7A7A85] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-4">
                {/* Username */}
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#7A7A85] ml-1">
                    {t('auth.signup.fields.username_label')}
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A55] group-focus-within:text-neon-mint transition-colors" />
                    <Input
                      {...register('username')}
                      className="pl-10 bg-[#0C0C0F] border-[#24242B] focus:border-neon-mint/50 h-11 text-sm"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-[10px] text-red-500 ml-1">{errors.username.message}</p>
                  )}
                </div>

                {/* Tag */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#7A7A85] ml-1">
                    {t('auth.signup.fields.tag_label')}
                  </label>
                  <div className="relative group">
                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A55] group-focus-within:text-neon-mint transition-colors" />
                    <Input
                      {...register('tag')}
                      className="pl-10 bg-[#0C0C0F] border-[#24242B] focus:border-neon-mint/50 h-11 text-sm"
                    />
                  </div>
                  {errors.tag && (
                    <p className="text-[10px] text-red-500 ml-1">{errors.tag.message}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#7A7A85] ml-1">
                  {t('auth.signup.fields.bio_label')}
                </label>
                <div className="relative group">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-[#4A4A55] group-focus-within:text-neon-mint transition-colors" />
                  <Textarea
                    {...register('bio')}
                    className="pl-10 bg-[#0C0C0F] border-[#24242B] focus:border-neon-mint/50 min-h-[120px] text-sm resize-none"
                    placeholder={t('auth.signup.fields.bio_placeholder')}
                  />
                </div>
                {errors.bio && (
                  <p className="text-[10px] text-red-500 ml-1">{errors.bio.message}</p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-11 border-white/5 bg-[#1C1C21] hover:bg-[#242428] text-[#7A7A85]"
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 h-11 bg-neon-mint hover:bg-neon-mint/80 text-deep-black font-black flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {t('common.save')}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
