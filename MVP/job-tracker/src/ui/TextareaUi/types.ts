import z from "zod";

export const TextareaSchema = z.object({
  label: z.string().optional(),
  error: z.string().optional(),
  rows: z.number(),
  placeholder: z.string(),
});

export type TextareaProps = z.infer<typeof TextareaSchema>;
