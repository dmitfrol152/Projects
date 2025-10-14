import z from "zod";

export const AreaSchema = z.object({
  name: z.string(),
});

export const EmployerSchema = z.object({
  name: z.string(),
});

export const DataSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: AreaSchema,
  employer: EmployerSchema,
  published_at: z.string(),
  alternate_url: z.string(),
});

export type DataProps = z.infer<typeof DataSchema>;

export const VacanciesDataListSchema = z.object({
  dataList: z.array(DataSchema),
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
});

export type VacanciesDataListProps = z.infer<typeof VacanciesDataListSchema>;
