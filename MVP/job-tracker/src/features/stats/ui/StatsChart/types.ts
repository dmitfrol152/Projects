import z from "zod";

export const StatsChartSchema = z.object({
  week: z.string(),
  count: z.number(),
});

export type StatsChartProps = z.infer<typeof StatsChartSchema>;

export const StatsChartDatsSchema = z.object({
  data: z.array(StatsChartSchema),
});

export type StatsChartDatsProps = z.infer<typeof StatsChartDatsSchema>;
