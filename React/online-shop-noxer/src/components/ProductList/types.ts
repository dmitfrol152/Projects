import { ProductSchema } from "@/types/productType";
import z from "zod";

export const ProductListSchema = z.object({
  productList: z.array(ProductSchema),
});

export type ProductListProps = z.infer<typeof ProductListSchema>;
