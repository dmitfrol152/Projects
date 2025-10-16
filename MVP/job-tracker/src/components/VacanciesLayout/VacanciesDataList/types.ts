import z from "zod";
import { DataSchema } from "../VacanciesDataItem/types";
import { DashboardFormResolverSchema } from "@/components/Form/types";

export const VacanciesDataListSchema = z.object({
  dataList: z.array(DataSchema),
  handleSubmitNewFormDashboard: z.function({
    input: [DashboardFormResolverSchema],
    output: z.void(),
  }),
});

export type VacanciesDataListProps = z.infer<typeof VacanciesDataListSchema>;
