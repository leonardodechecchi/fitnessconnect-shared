import { z } from 'zod';
import { isValidObjectId, Types } from 'mongoose';
import { paginationSchema } from '../common/common.schema.js';

export const wishlistDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.custom<Types.ObjectId>(),
  createdAt: z.date(),
});

const wishlistEntitySchema = wishlistDTOSchema.extend({
  _id: z.custom<Types.ObjectId>(),
  updatedAt: z.date(),
});

export const wishlistIdSchema = z.object({
  wishlistId: z.string().refine((id) => isValidObjectId(id)),
});

export const wishlistsPaginationSchema = paginationSchema.extend({
  data: z.array(wishlistDTOSchema),
});

export const createWishlistSchema = z.object({
  name: z.string().trim().min(2).max(50),
  trainerId: z.string().refine((trainerId) => isValidObjectId(trainerId)),
});

export const updateWishlistSchema = z.object({
  name: z.string().trim().min(2).max(50),
});

export const patchWishlistSchema = updateWishlistSchema.partial();

export const getWishlistsSchema = z.object({
  limit: z
    .string()
    .default('10')
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 1,
      'Input must be positive integer',
    ),
  page: z
    .string()
    .default('1')
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 1,
      'Input must be positive integer',
    ),
  sortBy: z.enum(['name', 'createdAt']).default('createdAt'),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
});

export type WishlistDTO = z.infer<typeof wishlistDTOSchema>;
export type WishlistEntity = z.infer<typeof wishlistEntitySchema>;
export type WishlistIdSchema = z.infer<typeof wishlistIdSchema>;
export type CreateWishlistSchema = z.infer<typeof createWishlistSchema>;
export type UpdateWishlistSchema = z.infer<typeof updateWishlistSchema>;
export type PatchWishlistSchema = z.infer<typeof patchWishlistSchema>;
export type GetWishlistsSchema = z.infer<typeof getWishlistsSchema>;
