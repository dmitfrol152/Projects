import { ColumnsSchema } from "@/constants/types";
import { TagFiltersSchema } from "@/hooks/useJobsManager/types";
import type { Dispatch, SetStateAction } from "react";
import z from "zod";
import { KanbanArraySchema } from "@components/DashboardLayout/KanbanBoard/types";

export const DashboardFilterColumnsSchema = z.object({
  isOpenFilters: z.boolean(),
  columns: z.array(ColumnsSchema),
  handleChangeStatusColumns: z.function({
    input: [ColumnsSchema],
    output: z.void(),
  }),
  handleOpenFilters: z.function({
    input: [],
    output: z.void(),
  }),
  valueSort: z.string(),
  setValueSort: z.custom<Dispatch<SetStateAction<string>>>(),
  popularTags: z.array(TagFiltersSchema),
  handleChangeStatusTags: z.function({
    input: [TagFiltersSchema],
    output: z.void(),
  }),
  handleDownloadXlsx: z.function({
    input: [KanbanArraySchema],
    output: z.void(),
  }),
  handleDownloadCsv: z.function({
    input: [KanbanArraySchema],
    output: z.void(),
  }),
});

export type DashboardFilterColumnsProps = z.infer<
  typeof DashboardFilterColumnsSchema
>;
