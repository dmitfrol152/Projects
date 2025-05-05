import { z } from "zod";
import { MovieSchema } from "../../api/Movie/types";

export const IMovieRandomPropsSchema = z.object({
  data: MovieSchema.optional(),
  loading: z.boolean().optional(),
  refetch: z.function().args(z.any()).returns(z.void()).optional(),
});

export type IMovieRandomProps = z.infer<typeof IMovieRandomPropsSchema>;
