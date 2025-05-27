import z from 'zod';

export const emailSchema = z.string().email('Invalid email format');
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long');

export type EmailSchema = z.infer<typeof emailSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
