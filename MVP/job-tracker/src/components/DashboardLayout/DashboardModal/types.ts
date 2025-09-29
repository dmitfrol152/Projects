import { type DashboardFormResolverProps } from "@/components/Form/types";
import {
  type UseFormHandleSubmit,
  type UseFormRegister,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import z from "zod";
import { KanbanSchema } from "../KanbanBoard/types";
import { type Ref } from "react";

export const DashboardModalSchema = z.object({
  isOpenModal: KanbanSchema.nullable(),
  modalRef: z.custom<Ref<HTMLDivElement>>(),
  handleSubmit: z.custom<UseFormHandleSubmit<DashboardFormResolverProps>>(),
  handleSubmitEditFormDashboard:
    z.custom<SubmitHandler<DashboardFormResolverProps>>(),
  errorDataBase: z.boolean(),
  errors: z.custom<FieldErrors<DashboardFormResolverProps>>(),
  register: z.custom<UseFormRegister<DashboardFormResolverProps>>(),
  handleCloseModal: z.function({
    input: [],
    output: z.void(),
  }),
});

export type DashboardModalProps = z.infer<typeof DashboardModalSchema>;
