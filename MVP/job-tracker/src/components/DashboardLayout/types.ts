import type { ReactNode } from "react";
import z from "zod";

export const DashboardLayoutSchema = z.object({
  title: z.custom<ReactNode>(),
  paragraph: z.custom<ReactNode>(),
  kanban: z.custom<ReactNode>(),
  formKanban: z.custom<ReactNode>(),
  modal: z.custom<ReactNode>(),
});

export type DashboardLayoutProps = z.infer<typeof DashboardLayoutSchema>;
