import { startOfWeek, format, endOfWeek } from "date-fns";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useMemo } from "react";

export function useStatsGroupedByWeek(jobs: KanbanProps[]) {
  const chartData = useMemo(() => {
    const weekToCountMap: Record<string, number> = {};

    jobs.forEach((job) => {
      const weekStart = startOfWeek(new Date(job.created_at), {
        weekStartsOn: 1,
      });
      const weekEnd = endOfWeek(new Date(job.created_at), {
        weekStartsOn: 1,
      });
      const formattedStart = format(weekStart, "dd MMM");
      const formattedEnd = format(weekEnd, "dd MMM");
      const key = `${formattedStart} - ${formattedEnd}`;
      weekToCountMap[key] = (weekToCountMap[key] || 0) + 1;
    });

    return Object.entries(weekToCountMap).map(([week, count]) => ({
      week,
      count,
    }));
  }, [jobs]);

  return chartData;
}
