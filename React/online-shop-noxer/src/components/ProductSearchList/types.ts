import { ProductSchema } from "@/types/productType";
import z from "zod";

export const ProductSearchListSchema = z.object({
  productSearchList: z.array(ProductSchema),
  loading: z.boolean(),
  isFetchingNextPage: z.boolean(),
  hasNextPage: z.boolean(),
  fetchNextPage: z.function({
    input: [],
    output: z.void(),
  }),
});

export type ProductSearchListProps = z.infer<typeof ProductSearchListSchema>;
