import z from "zod";
import { KanbanSchema } from "../types";

export const KanbanCardSchema = z.object({
  job: KanbanSchema,
  handleEditJob: z.function({
    input: [KanbanSchema],
    output: z.void(),
  }),
  handleDeleteJob: z.function({
    input: [KanbanSchema],
    output: z.void(),
  }),
});

export type KanbanCardProps = z.infer<typeof KanbanCardSchema>;
