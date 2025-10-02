import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useMemo } from "react";

export function useStatsInfoCounts(jobs: KanbanProps[]) {
  const statsList = useMemo(() => {
    return [
      { title: "Total", value: jobs.length, color: "" },
      {
        title: "Applied",
        value: jobs.filter((job) => job.status === "applied").length,
        color: "text-blue-500",
      },
      {
        title: "Interview",
        value: jobs.filter((job) => job.status === "interview").length,
        color: "text-yellow-500",
      },
      {
        title: "Offer",
        value: jobs.filter((job) => job.status === "offer").length,
        color: "text-green-500",
      },
      {
        title: "Rejected",
        value: jobs.filter((job) => job.status === "rejected").length,
        color: "text-red-500",
      },
    ];
  }, [jobs]);

  return statsList;
}
