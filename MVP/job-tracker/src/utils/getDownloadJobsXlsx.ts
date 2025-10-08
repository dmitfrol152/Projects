import { utils, writeFile } from "xlsx";
import type { formatedJobsForExportProps } from "./types";

export function getDownloadJobsXlsx(
  formatedJobsForExport: formatedJobsForExportProps[]
) {
  const worksheet = utils.json_to_sheet(formatedJobsForExport);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Jobs");
  writeFile(workbook, `Jobs-${new Date()}.xlsx`);
}
