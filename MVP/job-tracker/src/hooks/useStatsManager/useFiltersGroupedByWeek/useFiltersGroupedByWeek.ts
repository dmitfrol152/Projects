import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { startOfWeek, format } from "date-fns";

export function useFiltersGroupedByWeek() {
  function filtersGroupedByWeek(jobs: KanbanProps[]) {
    const map: Record<string, number> = {};

    jobs.forEach((job) => {
      const weekStart = startOfWeek(new Date(job.created_at), {
        weekStartsOn: 1,
      });
      const formatCustom = format(weekStart, "dd MMMM");

      map[formatCustom] = (map[formatCustom] || 0) + 1;
    });

    return Object.entries(map).map(([week, count]) => ({ week, count }));
  }

  return filtersGroupedByWeek;
}
