import z from 'zod';

export const usernameSchema = z
  .string()
  .min(1, 'Username must be at least 1 characters long')
  .max(20, 'Username must not exceed 20 characters');
export const emailSchema = z.string().email('Invalid email format');
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long');
export const notNullSchema = z.string().min(1, 'This field cannot be empty');

export type UsernameSchema = z.infer<typeof usernameSchema>;
export type NotNullSchema = z.infer<typeof notNullSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
