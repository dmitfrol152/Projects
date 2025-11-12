import z from "zod";

export const formatedJobsForExportSchema = z.object({
  "\u2116": z.number(),
  position: z.string(),
  company: z.string(),
  status: z.string(),
  tags: z.string(),
  notes: z.string(),
  created_at: z.string(),
});

export type formatedJobsForExportProps = z.infer<
  typeof formatedJobsForExportSchema
>;
