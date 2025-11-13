import { type DashboardFormResolverProps } from "@shared/ui/Form/types";
import {
  type UseFormHandleSubmit,
  type UseFormRegister,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import z from "zod";
import { KanbanSchema } from "@features/kanban/KanbanBoard/types";
import type { Dispatch, SetStateAction } from "react";

export const DashboardFormModalSchema = z.object({
  handleSubmit: z.custom<UseFormHandleSubmit<DashboardFormResolverProps>>(),
  handleSubmitEditFormDashboard:
    z.custom<SubmitHandler<DashboardFormResolverProps>>(),
  errors: z.custom<FieldErrors<DashboardFormResolverProps>>(),
  register: z.custom<UseFormRegister<DashboardFormResolverProps>>(),
  isOpenModal: KanbanSchema.nullable(),
  newTagValue: z.string(),
  setNewTagValue: z.custom<Dispatch<SetStateAction<string>>>(),
  arrayTagValue: z.array(z.string()),
  handleAddTag: z.function({
    input: [],
    output: z.void(),
  }),
  handleDeleteTag: z.function({
    input: [z.string()],
    output: z.void(),
  }),
  isErrorAddTag: z.boolean(),
});

export type DashboardFormModalProps = z.infer<typeof DashboardFormModalSchema>;
