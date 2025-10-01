import type { ReactNode } from "react";
import z from "zod";

export const HomeLayoutSchema = z.object({
  header: z.custom<ReactNode>(),
  children: z.custom<ReactNode>(),
  footer: z.custom<ReactNode>(),
});

export type HomeLayoutProps = z.infer<typeof HomeLayoutSchema>;
