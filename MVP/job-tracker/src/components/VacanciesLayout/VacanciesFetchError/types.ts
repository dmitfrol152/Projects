import z from "zod";

export const VacanciesFetchErrorSchema = z.object({
  handleRefetch: z.function({
    input: [],
    output: z.void(),
  }),
});

export type VacanciesFetchErrorProps = z.infer<
  typeof VacanciesFetchErrorSchema
>;
