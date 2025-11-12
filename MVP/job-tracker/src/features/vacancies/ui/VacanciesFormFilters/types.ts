import { type VacanciesFormResolverProps } from "@shared/ui/Form/types";
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import z from "zod";

export const VacanciesFormFiltersSchema = z.object({
  handleSubmit: z.custom<UseFormHandleSubmit<VacanciesFormResolverProps>>(),
  handleSubmitFilters: z.custom<SubmitHandler<VacanciesFormResolverProps>>(),
  handleClearFilter: z.function({
    input: [],
    output: z.void(),
  }),
  errors: z.custom<FieldErrors<VacanciesFormResolverProps>>(),
  register: z.custom<UseFormRegister<VacanciesFormResolverProps>>(),
  emptyValuesFilter: z.boolean(),
});

export type VacanciesFormFiltersProps = z.infer<
  typeof VacanciesFormFiltersSchema
>;
