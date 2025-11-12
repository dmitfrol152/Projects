import type { ReactNode } from "react";
import z from "zod";

export const VacanciesLayoutSchema = z.object({
  title: z.custom<ReactNode>(),
  paragraph: z.custom<ReactNode>(),
  input: z.custom<ReactNode>(),
  formFilters: z.custom<ReactNode>(),
  loadingVacancies: z.boolean(),
  isError: z.boolean(),
  errorFecthVacancies: z.custom<ReactNode>(),
  isSuccess: z.boolean(),
  dataFound: z.number(),
  data: z.custom<ReactNode>(),
  pagination: z.custom<ReactNode>(),
  isEmpty: z.boolean(),
  emptyVacancies: z.custom<ReactNode>(),
  buttonTop: z.custom<ReactNode>(),
  isVisibleButtonTop: z.boolean(),
  loadingAddJob: z.boolean(),
  modal: z.custom<ReactNode>(),
});

export type VacanciesLayoutProps = z.infer<typeof VacanciesLayoutSchema>;
