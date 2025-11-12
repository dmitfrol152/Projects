import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import { getDownloadJobsCsv } from "@shared/lib/utils/getDownloadJobsCsv";
import { getDownloadJobsXlsx } from "@shared/lib/utils/getDownloadJobsXlsx";
import { useCallback } from "react";

export function useFormatedJobsForExport(
  groupedJobsWithoutPage: KanbanProps[]
) {
  const formatedJobsForExport = useCallback(() => {
    return groupedJobsWithoutPage.map((job, index) => ({
      "№": index + 1,
      position: job.position,
      company: job.company,
      status: job.status,
      tags: job.tags ? job.tags.join(", ") : "",
      notes: job.notes ? job.notes : "",
      created_at: String(job.created_at).split("T")[0],
    }));
  }, [groupedJobsWithoutPage]);

  const handleDownloadXlsx = useCallback(() => {
    const data = formatedJobsForExport();
    return getDownloadJobsXlsx(data);
  }, [formatedJobsForExport]);

  const handleDownloadCsv = useCallback(() => {
    const data = formatedJobsForExport();
    return getDownloadJobsCsv(data);
  }, [formatedJobsForExport]);

  return { handleDownloadXlsx, handleDownloadCsv };
}
