import { z } from 'zod';
import { userDTOSchema } from '../user.schema.js';

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

export type TrainerDTO = z.infer<typeof trainerDTOSchema>;
