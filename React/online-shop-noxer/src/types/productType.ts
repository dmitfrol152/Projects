import z from "zod";

export const MarkSchema = z.object({
  Mark_Name: z.string(),
  color_code: z.string(),
});

export type MarkProps = z.infer<typeof MarkSchema>;

export const ImageSchema = z.object({
  Image_URL: z.string(),
  MainImage: z.boolean().optional(),
});

export type ImageProps = z.infer<typeof ImageSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  images: z.array(ImageSchema),
  marks: z.array(MarkSchema),
  name: z.string(),
  old_price: z.number().nullable(),
  price: z.number(),
});

export type ProductProps = z.infer<typeof ProductSchema>;
