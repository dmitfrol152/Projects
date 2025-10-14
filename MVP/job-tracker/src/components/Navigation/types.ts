import type { User } from "@supabase/supabase-js";
import z from "zod";

export const NavigationSchema = z.object({
  className: z.string(),
  isVisibleSearchButton: z.boolean().optional(),
  isVisibleExitButton: z.boolean().optional(),
  isVisibleSettingsLink: z.boolean().optional(),
  handleClickSearch: z.function().optional(),
  user: z.custom<User | null>(),
  signOut: z
    .function({
      input: [],
      output: z.void(),
    })
    .optional(),
});

export type NavigationProps = z.infer<typeof NavigationSchema>;
