import { ProductSchema } from "@/types/productType";
import z from "zod";

export const ProductSearchItemSchema = z.object({
  product: ProductSchema,
});

export type ProductSearchItemProps = z.infer<typeof ProductSearchItemSchema>;
