import { z } from "zod";

export const FormFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
  placeholder: z.string(),
  value: z.string().optional(),
  onChange: z.function().args(z.any()).returns(z.void()),
  error: z.boolean().optional(),
  errors: z.string().optional(),
  require: z.boolean().optional(),
});

export type FormFieldProps = z.infer<typeof FormFieldSchema>;
