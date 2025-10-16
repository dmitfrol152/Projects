import type { ReactNode, Ref } from "react";
import z from "zod";

export const ModalSchema = z.object({
  isOpen: z.boolean(),
  children: z.custom<ReactNode>(),
  modalRef: z.custom<Ref<HTMLDivElement>>(),
  errorDataBase: z.boolean().optional(),
  successOperation: z.boolean().optional(),
});

export type ModalProps = z.infer<typeof ModalSchema>;
