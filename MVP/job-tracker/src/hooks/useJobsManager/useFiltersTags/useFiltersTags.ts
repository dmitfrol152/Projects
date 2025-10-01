import { useMemo } from "react";
import type { TagFiltersProps } from "../types";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";

export function useFiltersTags(
  tagsFilter: TagFiltersProps[],
  filtredSearchJobs: KanbanProps[]
) {
  const filtredByTagsJobs = useMemo(() => {
    const tagsFilterForStatus = tagsFilter
      .filter((tag) => tag.active)
      .map((tag) => tag.tagName);

    if (tagsFilterForStatus.length === 0) return filtredSearchJobs;

    return filtredSearchJobs.filter((job) =>
      job.tags?.some((tag) => tagsFilterForStatus.includes(tag))
    );
  }, [filtredSearchJobs, tagsFilter]);

  return filtredByTagsJobs;
}
