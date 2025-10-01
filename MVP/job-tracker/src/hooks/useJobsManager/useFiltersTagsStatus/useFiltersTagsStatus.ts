import { useCallback, useEffect, useState } from "react";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type { TagFiltersProps } from "../types";

export function useFiltersTagsStatus(jobs: KanbanProps[]) {
  const [tagsFilter, setTagsFilter] = useState<TagFiltersProps[]>([]);

  useEffect(() => {
    const tags = new Set<string>();
    jobs.forEach((job) => {
      if (job.tags) {
        job.tags.forEach((tag) => {
          tags.add(tag);
        });
      }
    });
    const arrayTags = Array.from(tags);
    const arrayTagsInObj = arrayTags.map((tag) => {
      return { tagName: tag, active: false };
    });
    setTagsFilter(arrayTagsInObj);
  }, [jobs]);

  const changeStatusTags = useCallback((obj: TagFiltersProps) => {
    setTagsFilter((prev) =>
      prev.map((item) => (item.tagName === obj.tagName ? obj : item))
    );
  }, []);

  return { tagsFilter, changeStatusTags };
}
