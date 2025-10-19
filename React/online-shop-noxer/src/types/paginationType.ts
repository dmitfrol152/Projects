import z from "zod";

export const PaginationSchema = z.object({
  current_page: z.number(),
  has_next: z.boolean(),
  has_prev: z.boolean(),
  per_page: z.number(),
  total_pages: z.number(),
  total_products: z.number(),
});

export type PaginationProps = z.infer<typeof PaginationSchema>;
