import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import { useMemo, useState } from "react";

export function useFiltersSorted(filtredByTagsJobs: KanbanProps[]) {
  const [valueSort, setValueSort] = useState<string>("");

  const sortedJobs = useMemo(() => {
    switch (valueSort) {
      case "company":
        return [...filtredByTagsJobs].sort((a, b) =>
          a.company.localeCompare(b.company)
        );
      case "position":
        return [...filtredByTagsJobs].sort((a, b) =>
          a.position.localeCompare(b.position)
        );
      case "date":
        return [...filtredByTagsJobs].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "default":
        return filtredByTagsJobs;
      default:
        return filtredByTagsJobs;
    }
  }, [filtredByTagsJobs, valueSort]);

  return { sortedJobs, valueSort, setValueSort };
}
