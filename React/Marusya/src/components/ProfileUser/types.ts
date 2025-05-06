import { z } from "zod";
import { MovieListSchema } from "../../api/Movie/types";

export const DataProfileSchema = z.object({
  email: z.string(),
  favorites: z.string().array(),
  name: z.string(),
  surname: z.string(),
});

export const DataProfileObjSchema = z.object({
  dataProfile: DataProfileSchema.optional(),
  dataFavoritesMovie: MovieListSchema.optional(),
  loading: z.boolean().optional(),
  exitMutation: z.custom(),
});

export type DataProfileProps = z.infer<typeof DataProfileObjSchema>;
