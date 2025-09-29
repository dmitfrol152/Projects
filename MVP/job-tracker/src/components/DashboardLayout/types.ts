import z from "zod";

export const DashboardLayoutSchema = z.object({
  title: z.any(),
  paragraph: z.any(),
  aside: z.any(),
  kanban: z.any(),
  formKanban: z.any(),
  modal: z.any(),
});

export type DashboardLayoutProps = z.infer<typeof DashboardLayoutSchema>;
