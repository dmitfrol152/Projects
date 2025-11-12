import z from "zod";

export const VacanciesButtonTopSchema = z.object({
  handleClickTop: z.function({
    input: [],
    output: z.void(),
  }),
});

export type VacanciesButtonTopProps = z.infer<typeof VacanciesButtonTopSchema>;
