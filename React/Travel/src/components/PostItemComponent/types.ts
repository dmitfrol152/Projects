import { z } from "zod";
import { PostItemSchema } from "../../api/Posts/types";

export const PostItemPropsSchema = z.object({
  post: PostItemSchema,
});

export type PostItemProps = z.infer<typeof PostItemPropsSchema>;
