import type { User } from "@supabase/supabase-js";
import z from "zod";

export const LogoSchema = z.object({
  profileSrc: z.string().optional(),
  user: z.custom<User | null>(),
});

export type LogoProps = z.infer<typeof LogoSchema>;
