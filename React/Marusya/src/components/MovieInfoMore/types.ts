import { z } from "zod";
import { MovieSchema } from "../../api/Movie/types";

export const IMoviePropsSchema = z.object({
  data: MovieSchema.optional(),
  loading: z.boolean().optional(),
});

export type IMovieProps = z.infer<typeof IMoviePropsSchema>;
