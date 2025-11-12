import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import { useMemo } from "react";
import { useSearch } from "@/shared/lib/context/contexts";

export function useFiltersSearch(jobs: KanbanProps[]) {
  const { debounceValue } = useSearch();

  const filtredSearchJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        job.position.toLowerCase().includes(debounceValue) ||
        job.company.toLowerCase().includes(debounceValue)
      );
    });
  }, [debounceValue, jobs]);

  return filtredSearchJobs;
}
