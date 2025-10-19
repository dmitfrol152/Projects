import type { ReactNode } from "react";
import z from "zod";

export const LinkSchema = z.object({
  to: z.string(),
  variant: z.enum([
    "primary",
    "secondary",
    "social",
    "small",
    "search",
    "card",
  ]),
  children: z.custom<ReactNode>(),
  target: z.string().optional(),
  active: z.boolean().optional(),
});

export type LinkProps = z.infer<typeof LinkSchema>;
