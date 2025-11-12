import type { ReactNode } from "react";
import z from "zod";

export const ButtonSchema = z.object({
  className: z.string().optional(),
  type: z.enum(["submit", "button", "reset"]),
  children: z.custom<ReactNode>(),
  handleClickButton: z.function().optional(),
  size: z.string(),
  variant: z.string(),
  disabled: z.boolean().optional(),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;
