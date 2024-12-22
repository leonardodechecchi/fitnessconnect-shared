import { z } from 'zod';

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
