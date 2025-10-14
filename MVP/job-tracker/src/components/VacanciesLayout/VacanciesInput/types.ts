import type { SetStateAction, Dispatch } from "react";
import z from "zod";

export const VacanciesInputSchema = z.object({
  query: z.string(),
  setQuery: z.custom<Dispatch<SetStateAction<string>>>(),
});

export type VacanciesInputProps = z.infer<typeof VacanciesInputSchema>;
