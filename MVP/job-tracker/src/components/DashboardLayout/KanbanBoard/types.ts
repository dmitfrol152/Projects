import { ColumnsSchema } from "@/constants/types";
import z from "zod";

export const KanbanSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  status: z.enum(["", "applied", "interview", "offer", "rejected"]),
  created_at: z.date(),
  notes: z.string().nullable(),
  tags: z.array(z.string()),
});

export type KanbanProps = z.infer<typeof KanbanSchema>;

export const KanbanArraySchema = z.array(KanbanSchema);

export const KanbanMapSchema = z.map(z.string(), KanbanArraySchema);

export type KanbanMapProps = z.infer<typeof KanbanMapSchema>;

export const KanbanBoardSchema = z.object({
  jobs: KanbanMapSchema,
  setJobs: z.any(),
  handleEditJob: z.function({
    input: [KanbanSchema],
    output: z.void(),
  }),
  handleDeleteJob: z.function({
    input: [KanbanSchema],
    output: z.void(),
  }),
  loading: z.boolean(),
  columns: z.array(ColumnsSchema),
  handleMoreJobs: z.function({
    input: [],
    output: z.void(),
  }),
  visibleButtonMore: z.boolean().nullable(),
});

export type KanbanBoardProps = z.infer<typeof KanbanBoardSchema>;
