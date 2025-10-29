import { ColumnsSchema } from "@/constants/types";
import type { User } from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";
import z from "zod";

export const KanbanSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  status: z.enum(["", "applied", "interview", "offer", "rejected", "washlist"]),
  created_at: z.date(),
  notes: z.string().nullable(),
  tags: z.array(z.string()),
  profile_id: z.string(),
  user_id: z.string(),
});

export type KanbanProps = z.infer<typeof KanbanSchema>;

export const KanbanArraySchema = z.array(KanbanSchema);

export const KanbanMapSchema = z.map(z.string(), KanbanArraySchema);

export type KanbanMapProps = z.infer<typeof KanbanMapSchema>;

export const KanbanBoardSchema = z.object({
  jobs: KanbanMapSchema,
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
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
  user: z.custom<User | null>(),
});

export type KanbanBoardProps = z.infer<typeof KanbanBoardSchema>;
