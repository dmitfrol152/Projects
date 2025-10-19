import { CategoriesSchema } from "@/types/categoriesType";
import z from "zod";

export const CategoriesListSchema = z.object({
  categories: z.array(CategoriesSchema),
});

export type CategoriesListProps = z.infer<typeof CategoriesListSchema>;
