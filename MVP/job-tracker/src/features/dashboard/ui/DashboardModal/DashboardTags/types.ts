import z from "zod";
import { KanbanSchema } from "@features/kanban/KanbanBoard/types";
import type { Dispatch, SetStateAction } from "react";

export const DashboardTagsSchema = z.object({
  job: KanbanSchema.nullable(),
  newTagValue: z.string(),
  setNewTagValue: z.custom<Dispatch<SetStateAction<string>>>(),
  arrayTagValue: z.array(z.string()),
  handleAddTag: z.function({
    input: [KanbanSchema.nullable()],
    output: z.void(),
  }),
  handleDeleteTag: z.function({
    input: [z.string()],
    output: z.void(),
  }),
  isErrorAddTag: z.boolean(),
});

export type DashboardTagsProps = z.infer<typeof DashboardTagsSchema>;
