import type { DashboardFormResolverProps } from "@shared/ui/Form/types";
import type { UseFormSetValue } from "react-hook-form";
import z from "zod";

export const ModalManagerSchema = z.object({
  reset: z.function({
    input: [],
    output: z.void(),
  }),
  setValue: z.custom<UseFormSetValue<DashboardFormResolverProps>>(),
});

export type ModalManagerProps = z.infer<typeof ModalManagerSchema>;
