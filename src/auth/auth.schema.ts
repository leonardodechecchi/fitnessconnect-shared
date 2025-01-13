import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().email().min(5).max(100),
  password: z.string().trim().min(8).max(64),
  picture: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email().min(5).max(100),
  password: z.string().min(8).max(64),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
