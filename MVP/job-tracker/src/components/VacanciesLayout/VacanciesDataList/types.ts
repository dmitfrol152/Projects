import z from "zod";
import { DataSchema } from "../VacanciesDataItem/types";

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
