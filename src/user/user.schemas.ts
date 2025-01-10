import { z } from 'zod';
import { isValidObjectId, type Types } from 'mongoose';
import { trainerProfileSchema } from '../trainer/trainer.schemas.js';
import { paginationSchema } from '../common/common.schema.js';
import { registerSchema } from '../auth/auth.schemas.js';

export const USER_ROLES = ['USER', 'TRAINER', 'ADMIN'] as const;

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

export const userIdSchema = z.object({
  userId: z.string().refine((id) => isValidObjectId(id), 'Invalid id'),
});

export const userPaginationSchema = paginationSchema.extend({
  data: z.array(userDTOSchema),
});

export const createUserSchema = registerSchema;

export const patchUserSchema = z
  .object({
    firstName: z.string().trim().min(2).max(50),
    lastName: z.string().trim().min(2).max(50),
  })
  .partial();

// export const pictureUploadSchema = z.object({
//   buffer: z.custom<Buffer>(async (buffer) => {
//     const result = await validateBufferMIMEType(buffer, {
//       allowMimeTypes: ['image/jpeg', 'image/png'],
//     });

//     return result.ok;
//   }),
// });

export type UserRoles = (typeof USER_ROLES)[number];
export type UserDTO = z.infer<typeof userDTOSchema>;
export type UserEntity = z.infer<typeof userEntitySchema>;
export type UserIdSchema = z.infer<typeof userIdSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type PatchUserSchema = z.infer<typeof patchUserSchema>;
export type UserPaginationSchema = z.infer<typeof userPaginationSchema>;
