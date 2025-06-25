import { z } from "zod";
import { PostsListSchema } from "../../api/Posts/types";

export const PostsListPropsSchema = z.object({
  data: PostsListSchema.optional(),
  loading: z.boolean().optional(),
});

export type PostsListProps = z.infer<typeof PostsListPropsSchema>;
