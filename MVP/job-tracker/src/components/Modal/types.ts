import z from "zod";

export const ModalSchema = z.object({
  isOpen: z.boolean(),
  children: z.any(),
  modalRef: z.any(),
});

export type ModalProps = z.infer<typeof ModalSchema>;
