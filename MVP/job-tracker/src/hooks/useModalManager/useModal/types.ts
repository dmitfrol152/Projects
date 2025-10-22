import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const ModalSchema = z.object({
  callbackErr: z.custom<Dispatch<SetStateAction<string>>>().optional(),
  callbackSuccess: z.custom<Dispatch<SetStateAction<boolean>>>().optional(),
  reset: z
    .function({
      input: [],
      output: z.void(),
    })
    .optional(),
});

export type ModalProps = z.infer<typeof ModalSchema>;
