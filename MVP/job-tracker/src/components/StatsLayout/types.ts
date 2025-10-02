import type { ReactNode } from "react";
import z from "zod";

export const StatsLayoutSchema = z.object({
  statsTitle: z.custom<ReactNode>(),
  statsInfo: z.custom<ReactNode>(),
  statsChart: z.custom<ReactNode>(),
});

export type StatsLayoutProps = z.infer<typeof StatsLayoutSchema>;
