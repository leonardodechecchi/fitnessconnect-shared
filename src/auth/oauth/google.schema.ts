import { z } from 'zod';

export const tokenPayloadSchema = z.object({
  email: z.string(),
  picture: z.string().optional(),
  given_name: z.string(),
  family_name: z.string(),
});

export const credentialSchema = z.object({
  access_token: z.string(),
  id_token: z.string(),
});

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;
export type CredentialSchema = z.infer<typeof credentialSchema>;
