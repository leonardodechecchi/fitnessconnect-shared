import { z } from 'zod';
import { userDTOSchema } from '../user.schemas.js';
import { isValidObjectId } from 'mongoose';
import { paginationParamsSchema } from '../../common/common.schema.js';

export const trainerProfileSchema = z.object({
  specialties: z.array(z.string()),
  certifications: z.array(z.string()),
  address: z.object({
    street: z.string(),
    postalCode: z.string(),
    city: z.string(),
    province: z.string(),
    region: z.string(),
    country: z.string(),
  }),
  verified: z.boolean(),
});

export const trainerDTOSchema = userDTOSchema.extend({
  trainerProfile: trainerProfileSchema,
});

export const trainerIdSchema = z.object({
  trainerId: z.string().refine((id) => isValidObjectId(id)),
});

export const getTrainersPaginationSchema = paginationParamsSchema.extend({
  searchString: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
});

export type TrainerDTO = z.infer<typeof trainerDTOSchema>;
export type TrainerIdSchema = z.infer<typeof trainerIdSchema>;
export type GetTrainersPaginationSchema = z.infer<
  typeof getTrainersPaginationSchema
>;
