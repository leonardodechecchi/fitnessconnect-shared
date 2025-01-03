import { z } from 'zod';
import { isValidObjectId, type Types } from 'mongoose';
import { userDTOSchema, userEntitySchema } from '../user/user.schemas.js';
import {
  paginationParamSchema,
  paginationSchema,
} from '../common/common.schema.js';

export const wishlistItemDTOSchema = z.object({
  id: z.string(),
  wishlistId: z.string(),
  trainerId: z.string(),
  trainer: userDTOSchema.optional(),
  createdAt: z.date(),
});

const wishlistItemEntitySchema = wishlistItemDTOSchema.extend({
  _id: z.custom<Types.ObjectId>(),
  wishlistId: z.custom<Types.ObjectId>(),
  trainerId: z.custom<Types.ObjectId>(),
  trainer: userEntitySchema.optional(), // ! virtual
  updatedAt: z.date(),
});

export const wishlistItemIdSchema = z.object({
  itemId: z.string().refine((itemId) => isValidObjectId(itemId)),
});

export const createWishlistItemSchema = z.object({
  trainerId: z.string().refine((trainerId) => isValidObjectId(trainerId)),
});

export const getWishlistItemsByTrainerIdsSchema = z.object({
  trainerIds: z
    .array(z.custom<Types.ObjectId>((id) => isValidObjectId(id)))
    .default([]),
});

export const wishlistItemPaginationSchema = paginationSchema.extend({
  data: z.array(wishlistItemDTOSchema),
});

export const wishlistItemPaginationParamSchema = paginationParamSchema;

export type WishlistItemDTO = z.infer<typeof wishlistItemDTOSchema>;
export type WishlistItemEntity = z.infer<typeof wishlistItemEntitySchema>;
export type WishlistItemIdSchema = z.infer<typeof wishlistItemIdSchema>;
export type CreateWishlistItemSchema = z.infer<typeof createWishlistItemSchema>;
export type GetWishlistItemsByTrainerIdsSchema = z.infer<
  typeof getWishlistItemsByTrainerIdsSchema
>;
export type WishlistItemPaginationSchema = z.infer<
  typeof wishlistItemPaginationSchema
>;
export type WishlistItemPaginationParamSchema = z.infer<
  typeof wishlistItemPaginationParamSchema
>;
