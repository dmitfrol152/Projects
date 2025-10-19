import { ProductSchema } from "@/types/productType";
import z from "zod";

export const ProductItemSchema = z.object({
  product: ProductSchema,
});

export type ProductItemProps = z.infer<typeof ProductItemSchema>;
