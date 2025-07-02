import { z } from "zod";

export const FormTextareaSchema = z.object({
  id: z.string(),
  label: z.string(),
  placeholder: z.string(),
  value: z.string().optional(),
  onChange: z.function().args(z.any()).returns(z.void()),
  error: z.boolean().optional(),
  errors: z.string().optional(),
  require: z.boolean().optional(),
  rows: z.number().int().optional(),
  cols: z.number().int().optional(),
});

export type FormTextareaProps = z.infer<typeof FormTextareaSchema>;
