import type { ReactNode } from "react";
import z from "zod";

export const ButtonSchema = z.object({
  type: z.enum(["button"]),
  variant: z.string(),
  size: z.string(),
  onClick: z.function({
    input: [],
    output: z.void(),
  }),
  disabled: z.boolean().optional(),
  children: z.custom<ReactNode>(),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;
