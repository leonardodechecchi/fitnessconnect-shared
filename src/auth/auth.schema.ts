import { z } from 'zod';
import { createUserSchema } from '../user/user.schemas.js';

export const registerSchema = createUserSchema;

export const loginSchema = z.object({
  email: z.string().email().min(5).max(100),
  password: z.string().min(8).max(64),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
