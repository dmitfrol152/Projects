import z from "zod";
import { KanbanSchema } from "../types";

export const KanbanColumnSchema = z.object({
  title: z.string(),
  jobs: z.array(KanbanSchema),
  handleEditJob: z.function({
    input: [KanbanSchema],
    output: z.void(),
  }),
  handleDeleteJob: z.function({
    input: [KanbanSchema],
    output: z.void(),
  }),
  loading: z.boolean(),
});

export type KanbanColumnProps = z.infer<typeof KanbanColumnSchema>;
