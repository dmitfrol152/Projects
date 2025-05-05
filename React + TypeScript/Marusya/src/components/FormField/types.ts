import { ReactNode } from "react";
import { z } from "zod";

export const FormFieldSchema = z.object({
  label: z.string(),
  type: z.string(),
  name: z.string().optional(),
  onChange: z.function().args(z.any()).returns(z.void()).optional(),
  value: z.string().optional(),
  placeholder: z.string(),
  icon: z.custom<ReactNode>().optional(),
  error: z.string().optional(),
});

export type FormFieldProps = z.infer<typeof FormFieldSchema>;
