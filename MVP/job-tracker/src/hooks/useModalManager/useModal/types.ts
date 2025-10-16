import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const ModalSchema = z.object({
  callbackErr: z.custom<Dispatch<SetStateAction<string>>>().optional(),
  callbackSuccess: z.custom<Dispatch<SetStateAction<boolean>>>().optional(),
});

export type ModalProps = z.infer<typeof ModalSchema>;
