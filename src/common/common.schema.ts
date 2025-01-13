import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  data: z.array(z.any()),
});

export const paginationParamSchema = z.object({
  limit: z
    .string()
    .default('12')
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 1,
      'Input must be positive integer',
    )
    .transform(Number),
  page: z
    .string()
    .default('1')
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 1,
      'Input must be positive integer',
    )
    .transform(Number),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;
export type PaginationParamSchema = z.infer<typeof paginationParamSchema>;
