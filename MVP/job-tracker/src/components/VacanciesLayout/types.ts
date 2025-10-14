import type { ReactNode } from "react";
import z from "zod";

export const VacanciesLayoutSchema = z.object({
  title: z.custom<ReactNode>(),
  paragraph: z.custom<ReactNode>(),
  input: z.custom<ReactNode>(),
  loadingVacancies: z.boolean(),
  isError: z.boolean(),
  errorFecthVacancies: z.custom<ReactNode>(),
  isSuccess: z.boolean(),
  data: z.custom<ReactNode>(),
  isEmpty: z.boolean(),
  emptyVacancies: z.custom<ReactNode>(),
});

export type VacanciesLayoutProps = z.infer<typeof VacanciesLayoutSchema>;
