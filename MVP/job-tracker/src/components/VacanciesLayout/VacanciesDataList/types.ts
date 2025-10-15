import z from "zod";
import { DataSchema } from "../VacanciesDataItem/types";

export const VacanciesDataListSchema = z.object({
  dataList: z.array(DataSchema),
});

export type VacanciesDataListProps = z.infer<typeof VacanciesDataListSchema>;
