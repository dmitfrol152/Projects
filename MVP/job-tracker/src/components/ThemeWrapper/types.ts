import type { ReactNode } from "react";
import z from "zod";

export const ThemeWrapperSchema = z.object({
  children: z.custom<ReactNode>(),
});

export type ThemeWrapperProps = z.infer<typeof ThemeWrapperSchema>;
