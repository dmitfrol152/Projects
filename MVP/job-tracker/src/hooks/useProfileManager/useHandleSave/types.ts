import type { User } from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const HandleSaveSchema = z.object({
  user: z.custom<User | null>(),
  avatarFile: z.custom<File | null>(),
  avatarUrl: z.string().nullable(),
  memoryUrl: z.string().nullable(),
  setMemoryUrl: z.function({
    input: [z.string().nullable()],
    output: z.void(),
  }),
  fullName: z.string(),
  refreshProfile: z.function({
    input: [],
    output: z.void(),
  }),
  openModal: z.function({
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

export type HandleSaveProps = z.infer<typeof HandleSaveSchema>;
