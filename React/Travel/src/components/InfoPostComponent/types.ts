import { z } from "zod";
import { PostInfoSchema } from "../../api/Posts/types";

export const InfoPostSchema = z.object({
  data: PostInfoSchema.optional(),
  loading: z.boolean().optional(),
});

export type InfoPostProps = z.infer<typeof InfoPostSchema>;
