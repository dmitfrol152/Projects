import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const InputSchema = z.object({
  label: z.string(),
  placeholder: z.string(),
  type: z.string(),
  error: z.string().optional(),
  value: z.string().optional(),
  setValue: z.custom<Dispatch<SetStateAction<string>>>().optional(),
});

export type InputProps = z.infer<typeof InputSchema>;
