import z from "zod";
import { VacanciesDataListSchema } from "../VacanciesDataList/types";

export const VacanciesPaginationSchema = VacanciesDataListSchema.omit({
  dataList: true,
});

export type VacanciesPaginationProps = z.infer<
  typeof VacanciesPaginationSchema
>;
