import { z } from 'zod';

export const userDTOSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  picture: z.string().optional(),
  // trainerProfile: trainerProfileSchema.optional(),
});
