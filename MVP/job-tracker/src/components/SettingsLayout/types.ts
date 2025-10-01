import type { ReactNode } from "react";
import z from "zod";

export const SettingsLayoutSchema = z.object({
  title: z.custom<ReactNode>(),
  paragraph: z.custom<ReactNode>(),
});

export type SettingsLayoutProps = z.infer<typeof SettingsLayoutSchema>;
