import z from "zod";

export const VacanciesPaginationSchema = z.object({
  pages: z.number(),
  page: z.number(),
  handleBackPage: z.function({
    input: [],
    output: z.void(),
  }),
  handleNextPage: z.function({
    input: [],
    output: z.void(),
  }),
  paginationModel: z.string(),
  isFetchingNextPage: z.boolean().optional(),
  hasNextPage: z.boolean(),
  fetchNextPage: z.function({
    input: [],
    output: z.void(),
  }),
  handleToStartPage: z.function({
    input: [],
    output: z.void(),
  }),
  handleToEndPage: z.function({
    input: [],
    output: z.void(),
  }),
});

export type VacanciesPaginationProps = z.infer<
  typeof VacanciesPaginationSchema
>;
