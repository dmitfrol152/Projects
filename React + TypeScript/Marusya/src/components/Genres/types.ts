import { z } from "zod";
import { MovieGenresListSchema } from "../../api/Movie/types";

export const IGenresPropsSchema = z.object({
  data: MovieGenresListSchema.optional(),
  loading: z.boolean().optional(),
});

export type IGenresProps = z.infer<typeof IGenresPropsSchema>;
