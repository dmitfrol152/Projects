import { type NotificationFormResolverProps } from "@shared/ui/Form/types";
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import z from "zod";

export const NotificationFormCustomSchema = z.object({
  handleSubmit: z.custom<UseFormHandleSubmit<NotificationFormResolverProps>>(),
  errors: z.custom<FieldErrors<NotificationFormResolverProps>>(),
  register: z.custom<UseFormRegister<NotificationFormResolverProps>>(),
  handleSubmitNewNotification:
    z.custom<SubmitHandler<NotificationFormResolverProps>>(),
  handleClearPassed: z.function({
    input: [],
    output: z.void(),
  }),
  handleClearAll: z.function({
    input: [],
    output: z.void(),
  }),
});

export type NotificationFormCustomProps = z.infer<
  typeof NotificationFormCustomSchema
>;
