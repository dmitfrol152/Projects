import z from "zod";

export const CategoriesSchema = z.object({
  Category_ID: z.number(),
  Category_Image: z.string().nullable(),
  Category_Name: z.string(),
});

export type CategoriesProps = z.infer<typeof CategoriesSchema>;
