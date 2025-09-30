import { ColumnsSchema } from "@/constants/types";
import { type DashboardFormResolverProps } from "@/components/Form/types";
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import z from "zod";
import type { Dispatch, SetStateAction } from "react";
import { TagFiltersSchema } from "@/hooks/useJobsManager/types";

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
  errorDataBase: z.boolean(),
  errors: z.custom<FieldErrors<DashboardFormResolverProps>>(),
  register: z.custom<UseFormRegister<DashboardFormResolverProps>>(),
  valueSort: z.enum(["", "date", "position", "company", "default"]),
  setValueSort:
    z.custom<
      Dispatch<SetStateAction<"" | "company" | "position" | "date" | "default">>
    >(),
  popularTags: z.array(TagFiltersSchema),
  handleChangeStatusTags: z.function({
    input: [TagFiltersSchema],
    output: z.void(),
  }),
});

export type DashboardFormCustomProps = z.infer<
  typeof DashboardFormCustomSchema
>;
