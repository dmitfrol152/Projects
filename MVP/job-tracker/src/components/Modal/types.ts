import type { ReactNode, Ref } from "react";
import z from "zod";

export const ModalSchema = z.object({
  isOpen: z.boolean(),
  children: z.custom<ReactNode>(),
  modalRef: z.custom<Ref<HTMLDivElement>>(),
});

export type ModalProps = z.infer<typeof ModalSchema>;
