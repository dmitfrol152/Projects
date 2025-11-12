import type { Ref } from "react";
import z from "zod";

export const FooterModalSchema = z.object({
  isOpen: z.boolean(),
  modalRef: z.custom<Ref<HTMLDivElement>>(),
  closeModal: z.function({
    input: [],
    output: z.void(),
  }),
  code: z.string().nullable(),
  loading: z.boolean(),
});

export type FooterModalProps = z.infer<typeof FooterModalSchema>;
