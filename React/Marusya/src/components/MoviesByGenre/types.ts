import { z } from "zod";
import { MovieListSchema } from "../../api/Movie/types";

export const IGenresPropsSchema = z.object({
  data: MovieListSchema.optional(),
  loading: z.boolean().optional(),
  genre: z.string().optional(),
  nextPage: z.function().args().returns(z.void()).optional(),
  isLoadingMore: z.boolean().optional(),
  disabledBtn: z.boolean().optional(),
});

export type IGenresProps = z.infer<typeof IGenresPropsSchema>;
