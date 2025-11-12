import z from "zod";
import { StatsInfoItemSchema } from "../StatsInfoItem/types";

export const StatsInfoListSchema = z.object({
  statsInfoList: z.array(StatsInfoItemSchema),
});

export type StatsInfoListProps = z.infer<typeof StatsInfoListSchema>;
