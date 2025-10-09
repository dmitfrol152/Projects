import type { User } from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const HandleDeleteProfileSchema = z.object({
  user: z.custom<User | null>(),
  setAvatarFile: z.custom<Dispatch<SetStateAction<File | null>>>(),
  setAvatarUrl: z.custom<Dispatch<SetStateAction<string | null>>>(),
  refreshProfile: z.function({
    input: [],
    output: z.void(),
  }),
  openModal: z.function({
    input: [],
    output: z.void(),
  }),
  closeModal: z.function({
    input: [],
    output: z.void(),
  }),
  setModalAppeareName:
    z.custom<
      Dispatch<
        SetStateAction<
          | "errorEdit"
          | "successEdit"
          | "errorDeleteProfile"
          | "successDeleteProfile"
          | "confirmDeleteProfile"
          | null
        >
      >
    >(),
  setLoadingSave: z.function({
    input: [z.boolean()],
    output: z.void(),
  }),
});

export type HandleDeleteProfileProps = z.infer<
  typeof HandleDeleteProfileSchema
>;
