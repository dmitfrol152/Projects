import { z } from "zod";

export const FormFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
  placeholder: z.string(),
  errors: z.string().optional(),
});

export type FormFieldProps = z.infer<typeof FormFieldSchema>;
