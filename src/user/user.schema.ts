import { z } from 'zod';
import type { Types } from 'mongoose';
import { trainerProfileSchema } from './trainer/trainer.schema.js';

const USER_ROLES = ['USER', 'TRAINER', 'ADMIN'] as const;

export const userDTOSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  picture: z.string().optional(),
  trainerProfile: trainerProfileSchema.optional(),
});

export const userEntitySchema = userDTOSchema.extend({
  _id: z.custom<Types.ObjectId>(),
  roles: z.array(z.enum(USER_ROLES)),
  password: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserRoles = (typeof USER_ROLES)[number];
export type UserDTO = z.infer<typeof userDTOSchema>;
export type UserEntity = z.infer<typeof userEntitySchema>;
