import z from "zod";

export const InputSchema = z.object({
  label: z.string(),
  placeholder: z.string(),
  type: z.string(),
  error: z.string().optional(),
});

export type InputProps = z.infer<typeof InputSchema>;
