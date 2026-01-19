import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useStatsInfoCounts(jobs: KanbanProps[]) {
  const { t } = useTranslation("statistics");

  const statsList = useMemo(() => {
    return [
      { title: t("statisticsColumnTotal"), value: jobs.length, color: "" },
      {
        title: t("statisticsColumnApplied"),
        value: jobs.filter((job) => job.status === "applied").length,
        color: "text-blue-500",
      },
      {
        title: t("statisticsColumnInterview"),
        value: jobs.filter((job) => job.status === "interview").length,
        color: "text-yellow-500",
      },
      {
        title: t("statisticsColumnOffer"),
        value: jobs.filter((job) => job.status === "offer").length,
        color: "text-green-500",
      },
      {
        title: t("statisticsColumnRejected"),
        value: jobs.filter((job) => job.status === "rejected").length,
        color: "text-red-500",
      },
    ];
  }, [jobs, t]);

  return statsList;
}
