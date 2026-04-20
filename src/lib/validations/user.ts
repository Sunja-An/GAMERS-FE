import * as z from 'zod';

export const USER_VALIDATION = {
  USERNAME_MIN: 1,
  USERNAME_MAX: 16,
  TAG_MIN: 1,
  TAG_MAX: 5,
  BIO_MAX: 256,
  PASSWORD_MIN: 8,
};

// Helper to check password strength (at least 3 of: upper, lower, number, special)
const checkPasswordStrength = (password: string) => {
  let count = 0;
  if (/[a-z]/.test(password)) count++;
  if (/[A-Z]/.test(password)) count++;
  if (/[0-9]/.test(password)) count++;
  if (/[^a-zA-Z0-9]/.test(password)) count++;
  return count >= 3;
};

export const createSignupSchema = (t: (key: string) => string) => 
  z.object({
    email: z.string()
      .email(t('auth.signup.validation.email_invalid'))
      .max(256, t('auth.signup.validation.email_max')),
    password: z.string()
      .min(USER_VALIDATION.PASSWORD_MIN, t('auth.signup.validation.password_min'))
      .refine(checkPasswordStrength, {
        message: t('auth.signup.validation.password_complexity'),
      }),
    username: z.string()
      .min(USER_VALIDATION.USERNAME_MIN, t('auth.signup.validation.username_empty'))
      .max(USER_VALIDATION.USERNAME_MAX, t('auth.signup.validation.username_max'))
      .regex(/^[a-zA-Z0-9]+$/, t('auth.signup.validation.username_format')),
    tag: z.string()
      .min(USER_VALIDATION.TAG_MIN, t('auth.signup.validation.tag_empty'))
      .max(USER_VALIDATION.TAG_MAX, t('auth.signup.validation.tag_max'))
      .regex(/^[a-zA-Z0-9]+$/, t('auth.signup.validation.tag_format')),
    bio: z.string()
      .max(USER_VALIDATION.BIO_MAX, t('auth.signup.validation.bio_max'))
      .optional()
      .or(z.literal('')),
  });

export const createUpdateProfileSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string()
      .min(USER_VALIDATION.USERNAME_MIN, t('auth.signup.validation.username_empty'))
      .max(USER_VALIDATION.USERNAME_MAX, t('auth.signup.validation.username_max'))
      .regex(/^[a-zA-Z0-9]+$/, t('auth.signup.validation.username_format'))
      .optional(),
    tag: z.string()
      .min(USER_VALIDATION.TAG_MIN, t('auth.signup.validation.tag_empty'))
      .max(USER_VALIDATION.TAG_MAX, t('auth.signup.validation.tag_max'))
      .regex(/^[a-zA-Z0-9]+$/, t('auth.signup.validation.tag_format'))
      .optional(),
    bio: z.string()
      .max(USER_VALIDATION.BIO_MAX, t('auth.signup.validation.bio_max'))
      .optional()
      .or(z.literal('')),
    avatar: z.string().url(t('auth.profile.validation.avatar_url')).optional().or(z.literal('')),
  });

export const createChangePasswordSchema = (t: (key: string) => string) =>
  z.object({
    password: z.string()
      .min(USER_VALIDATION.PASSWORD_MIN, t('auth.signup.validation.password_min'))
      .refine(checkPasswordStrength, {
        message: t('auth.signup.validation.password_complexity'),
      }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('auth.settings.validation.password_mismatch'),
    path: ['confirmPassword'],
  });
