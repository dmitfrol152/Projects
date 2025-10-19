import { DataSchema } from "@/types/apiType";
import { ProductSchema } from "@/types/productType";
import type { Dispatch, SetStateAction } from "react";
import z from "zod";

const ProductsSchema = z.object({
  products: z.array(ProductSchema),
});

export const DataHomePageSchema = z.object({
  data: DataSchema,
  dataSearch: ProductsSchema.optional(),
  dataPending: z.boolean(),
  valueSearch: z.string(),
  setValueSeacrh: z.custom<Dispatch<SetStateAction<string>>>(),
  handleFocus: z.function({
    input: [],
    output: z.void(),
  }),
  handleBlur: z.function({
    input: [],
    output: z.void(),
  }),
  handleClickPhrase: z.function({
    input: [z.string()],
    output: z.void(),
  }),
  debounceValue: z.string(),
  isFocusedSearch: z.boolean(),
  isFetchingNextPage: z.boolean(),
  hasNextPage: z.boolean(),
  fetchNextPage: z.function({
    input: [],
    output: z.void(),
  }),
});

export type DataHomePageProps = z.infer<typeof DataHomePageSchema>;
