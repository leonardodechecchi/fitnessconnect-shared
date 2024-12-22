import { z } from 'zod';

const ORDER_BY = ['asc', 'desc'] as const;

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  data: z.array(z.any()),
});

export const paginationParamsSchema = z.object({
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
  orderBy: z.enum(ORDER_BY).default('desc'),
});

export type OrderBy = (typeof ORDER_BY)[number];
export type PaginationSchema = z.infer<typeof paginationSchema>;
export type PaginationParamsSchema = z.infer<typeof paginationParamsSchema>;
