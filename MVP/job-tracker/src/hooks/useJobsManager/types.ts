import type { Dispatch, SetStateAction } from "react";
import {
  KanbanSchema,
  type KanbanProps,
} from "@/components/DashboardLayout/KanbanBoard/types";
import z from "zod";

export const JobsManagerAddSchema = z.object({
  reset: z.function({
    input: [],
    output: z.void(),
  }),
});

export type JobsManagerAddProps = z.infer<typeof JobsManagerAddSchema>;

export const JobsManagerEditSchema = z.object({
  isOpenModal: KanbanSchema.nullable(),
  setIsOpenModal: z.custom<Dispatch<SetStateAction<KanbanProps | null>>>(),
  reset: z.function({
    input: [],
    output: z.void(),
  }),
  arrayTagValue: z.array(z.string()),
});

export type JobsManagerEditProps = z.infer<typeof JobsManagerEditSchema>;

export const TagFiltersSchema = z.object({
  tagName: z.string(),
  active: z.boolean(),
});

export type TagFiltersProps = z.infer<typeof TagFiltersSchema>;
