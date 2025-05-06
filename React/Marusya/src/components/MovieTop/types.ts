import { z } from "zod";
import { MovieListSchema } from "../../api/Movie/types";

export const IMoviePropsSchema = z.object({
  data: MovieListSchema.optional(),
  loading: z.boolean().optional(),
});

export type IMovieTopProps = z.infer<typeof IMoviePropsSchema>;
