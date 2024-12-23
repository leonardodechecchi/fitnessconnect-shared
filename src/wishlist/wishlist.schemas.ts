import { z } from 'zod';
import { isValidObjectId, Types } from 'mongoose';
import {
  paginationParamSchema,
  paginationSchema,
} from '../common/common.schema.js';

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

export const createWishlistSchema = z.object({
  name: z.string().trim().min(2).max(50),
  trainerId: z.string().refine((trainerId) => isValidObjectId(trainerId)),
});

export const updateWishlistSchema = z.object({
  name: z.string().trim().min(2).max(50),
});

export const patchWishlistSchema = updateWishlistSchema.partial();

export const wishlistPaginationSchema = paginationSchema.extend({
  data: z.array(wishlistDTOSchema),
});

export const wishlistPaginationParamSchema = paginationParamSchema.extend({
  sortBy: z.enum(['name', 'createdAt']).default('createdAt'),
});

export type WishlistDTO = z.infer<typeof wishlistDTOSchema>;
export type WishlistEntity = z.infer<typeof wishlistEntitySchema>;
export type WishlistIdSchema = z.infer<typeof wishlistIdSchema>;
export type CreateWishlistSchema = z.infer<typeof createWishlistSchema>;
export type UpdateWishlistSchema = z.infer<typeof updateWishlistSchema>;
export type PatchWishlistSchema = z.infer<typeof patchWishlistSchema>;
export type WishlistPaginationSchema = z.infer<typeof wishlistPaginationSchema>;
export type WishlistPaginationParamSchema = z.infer<
  typeof wishlistPaginationParamSchema
>;
