import { type DashboardFormResolverProps } from "@/components/Form/types";
import {
  type UseFormHandleSubmit,
  type UseFormRegister,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import z from "zod";

export const DashboardFormModalSchema = z.object({
  handleSubmit: z.custom<UseFormHandleSubmit<DashboardFormResolverProps>>(),
  handleSubmitEditFormDashboard:
    z.custom<SubmitHandler<DashboardFormResolverProps>>(),
  errorDataBase: z.boolean(),
  errors: z.custom<FieldErrors<DashboardFormResolverProps>>(),
  register: z.custom<UseFormRegister<DashboardFormResolverProps>>(),
});

export type DashboardFormModalProps = z.infer<typeof DashboardFormModalSchema>;
