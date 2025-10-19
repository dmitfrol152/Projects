import { CategoriesSchema } from "@/types/categoriesType";
import z from "zod";

export const CategoriesItemSchema = z.object({
  category: CategoriesSchema,
});

export type CategoriesItemProps = z.infer<typeof CategoriesItemSchema>;
