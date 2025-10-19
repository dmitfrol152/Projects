import z from "zod";

export const PaginationSchema = z.object({
  isFetchingNextPage: z.boolean(),
  hasNextPage: z.boolean(),
  fetchNextPage: z.function({
    input: [],
    output: z.void(),
  }),
});

export type PaginationProps = z.infer<typeof PaginationSchema>;
