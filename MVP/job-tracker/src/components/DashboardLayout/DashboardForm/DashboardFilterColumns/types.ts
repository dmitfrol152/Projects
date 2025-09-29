import { ColumnsSchema } from "@/constants/types";
import type { Dispatch, SetStateAction } from "react";
import z from "zod";

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
  valueSort: z.enum(["", "date", "position", "company", "default"]),
  setValueSort:
    z.custom<
      Dispatch<SetStateAction<"" | "company" | "position" | "date" | "default">>
    >(),
});

export type DashboardFilterColumnsProps = z.infer<
  typeof DashboardFilterColumnsSchema
>;
