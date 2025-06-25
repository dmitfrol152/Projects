import { z } from "zod";

export const PostItemSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  excerpt: z.string(),
  photo: z.string().optional(),
  city: z.string(),
  county: z.string(),
});

export const PostsListSchema = z.array(PostItemSchema);

export type PostItem = z.infer<typeof PostItemSchema>;

export type PostsList = z.infer<typeof PostsListSchema>;
