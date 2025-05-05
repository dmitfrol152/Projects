import { z } from "zod";
import { MovieGenresListSchema } from "../Movie/types";

export const UserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  favorites: MovieGenresListSchema,
});

export type IProfile = z.infer<typeof UserSchema>;
