import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const InputSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.string(),
  error: z.string().optional(),
  value: z.string().optional(),
  setValue: z.custom<Dispatch<SetStateAction<string>>>().optional(),
  accept: z.string().optional(),
  className: z.string().optional(),
  classNameLabel: z.string().optional(),
  onChange: z.function().optional(),
});

export type InputProps = z.infer<typeof InputSchema>;
