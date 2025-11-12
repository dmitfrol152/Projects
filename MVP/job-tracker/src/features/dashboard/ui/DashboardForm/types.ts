import { ColumnsSchema } from "@shared/lib/constants/types";
import { type DashboardFormResolverProps } from "@shared/ui/Form/types";
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import z from "zod";
import type { Dispatch, SetStateAction } from "react";
import { TagFiltersSchema } from "@features/jobs/model/types";
import { KanbanArraySchema } from "@features/kanban/KanbanBoard/types";

export const DashboardFormCustomSchema = z.object({
  columns: z.array(ColumnsSchema),
  isOpenFilters: z.boolean(),
  handleOpenFilters: z.function({ input: [], output: z.void() }),
  handleChangeStatusColumns: z.function({
    input: [ColumnsSchema],
    output: z.void(),
  }),
  handleSubmit: z.custom<UseFormHandleSubmit<DashboardFormResolverProps>>(),
  handleSubmitNewFormDashboard:
    z.custom<SubmitHandler<DashboardFormResolverProps>>(),
  errorDataBase: z.string(),
  errors: z.custom<FieldErrors<DashboardFormResolverProps>>(),
  register: z.custom<UseFormRegister<DashboardFormResolverProps>>(),
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

export type DashboardFormCustomProps = z.infer<
  typeof DashboardFormCustomSchema
>;
