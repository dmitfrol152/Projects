import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useMemo } from "react";
import { useSearch } from "@hooks/useContext";

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
