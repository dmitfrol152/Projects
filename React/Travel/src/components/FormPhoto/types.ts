import { z } from "zod";

export const FormFieldSchema = z.object({
  id: z.string().optional(),
  label: z.string().optional(),
  type: z.string(),
  errors: z.string().optional(),
  require: z.boolean().optional(),
  nameFile: z.string().optional(),
});

export type FormFieldProps = z.infer<typeof FormFieldSchema>;
