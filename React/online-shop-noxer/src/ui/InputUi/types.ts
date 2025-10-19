import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const InputSchema = z.object({
  label: z.string().optional(),
  type: z.string(),
  placeholder: z.string().optional(),
  value: z.string(),
  setValue: z.custom<Dispatch<SetStateAction<string>>>(),
  onFocus: z
    .function({
      input: [],
      output: z.void(),
    })
    .optional(),
  onBlur: z
    .function({
      input: [],
      output: z.void(),
    })
    .optional(),
});

export type InputProps = z.infer<typeof InputSchema>;
