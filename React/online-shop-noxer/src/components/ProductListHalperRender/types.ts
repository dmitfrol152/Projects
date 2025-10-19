import { DataSchema } from "@/types/apiType";
import { ProductSchema } from "@/types/productType";
import z from "zod";

const ProductsSchema = z.object({
  products: z.array(ProductSchema),
});

export const ProductListHalperRenderSchema = z.object({
  dataProducts: DataSchema,
  dataSearch: ProductsSchema.optional(),
  dataPending: z.boolean(),
  isFetchingNextPage: z.boolean(),
  hasNextPage: z.boolean(),
  fetchNextPage: z.function({
    input: [],
    output: z.void(),
  }),
  isFocusedSearch: z.boolean(),
  debounceValue: z.string(),
  handleClickPhrase: z.function({
    input: [z.string()],
    output: z.void(),
  }),
});

export type ProductListHalperRenderProps = z.infer<
  typeof ProductListHalperRenderSchema
>;
