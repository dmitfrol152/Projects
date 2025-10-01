import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useEffect, useMemo, useState } from "react";

export function useFiltersGroupedByPage(sortedJobs: KanbanProps[]) {
  const [page, setPage] = useState<number>(10);
  const [visibleButtonMore, setVisibleButtonMore] = useState<boolean | null>(
    null
  );

  const groupedJobs = useMemo(() => {
    const mapGroupedJobs = new Map<string, KanbanProps[]>();

    for (const job of sortedJobs) {
      const key = job.status;
      if (!mapGroupedJobs.has(key)) mapGroupedJobs.set(key, []);
      mapGroupedJobs.get(key)?.push(job);
    }
    return mapGroupedJobs;
  }, [sortedJobs]);

  const groupedJobsByPage = useMemo(() => {
    const mapGroupedJobsByPage = new Map<string, KanbanProps[]>();
    for (const [status, jobs] of groupedJobs.entries()) {
      mapGroupedJobsByPage.set(status, jobs.slice(0, page));
    }
    return mapGroupedJobsByPage;
  }, [groupedJobs, page]);

  useEffect(() => {
    for (const arrayStatus of groupedJobs.values()) {
      if (arrayStatus.length > page) {
        setVisibleButtonMore(true);
        break;
      } else {
        setVisibleButtonMore(false);
      }
    }
  }, [groupedJobs, page]);

  return {
    page,
    setPage,
    visibleButtonMore,
    setVisibleButtonMore,
    groupedJobsByPage,
  };
}
