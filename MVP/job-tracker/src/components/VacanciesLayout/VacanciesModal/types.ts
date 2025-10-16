import type { Dispatch, Ref, SetStateAction } from "react";
import z from "zod";

export const VacanciesModalSchema = z.object({
  isOpen: z.boolean(),
  modalRef: z.custom<Ref<HTMLDivElement>>(),
  closeModal: z.function({
    input: [],
    output: z.void(),
  }),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<boolean>>>(),
  errorDataBase: z.boolean(),
  setSuccessAddInKanban: z.custom<Dispatch<SetStateAction<boolean>>>(),
  successAddInKanban: z.boolean(),
});

export type VacanciesModalProps = z.infer<typeof VacanciesModalSchema>;
