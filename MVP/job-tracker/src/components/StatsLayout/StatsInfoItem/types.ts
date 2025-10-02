import z from "zod";

export const StatsInfoItemSchema = z.object({
  title: z.string(),
  value: z.number(),
  color: z.string(),
});

export type StatsInfoItemProps = z.infer<typeof StatsInfoItemSchema>;
