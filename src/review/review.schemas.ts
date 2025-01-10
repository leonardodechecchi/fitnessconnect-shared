import { isValidObjectId, Types } from 'mongoose';
import { z } from 'zod';
import { userEntitySchema } from '../user/user.schemas.js';
import {
  paginationParamSchema,
  paginationSchema,
} from '../common/common.schema.js';

export const reviewDTOSchema = z.object({
  id: z.string(),
  trainerId: z.string(),
  userId: z.string(),
  userFullName: z.string(),
  rating: z.number(),
  description: z.string().optional(),
  createdAt: z.date(),
});

const reviewEntitySchema = reviewDTOSchema.extend({
  _id: z.custom<Types.ObjectId>(),
  trainerId: z.custom<Types.ObjectId>(),
  userId: z.custom<Types.ObjectId>(),
  user: userEntitySchema.optional(), // ! virtual
  updatedAt: z.date(),
});

export const reviewIdSchema = z.object({
  reviewId: z.string().refine((id) => isValidObjectId(id)),
});

export const reviewPaginationSchema = paginationSchema.extend({
  data: z.array(reviewDTOSchema),
});

export const reviewPaginationParamSchema = paginationParamSchema.extend({
  sortBy: z.enum(['createdAt', 'rating']).optional(),
});

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  description: z.string().max(1000).optional(),
});

export type ReviewDTO = z.infer<typeof reviewDTOSchema>;
export type ReviewEntity = z.infer<typeof reviewEntitySchema>;
export type ReviewIdSchema = z.infer<typeof reviewIdSchema>;
export type ReviewPaginationSchema = z.infer<typeof reviewPaginationSchema>;
export type ReviewPaginationParamSchema = z.infer<
  typeof reviewPaginationParamSchema
>;
export type CreateReviewSchema = z.infer<typeof createReviewSchema>;
