import z from "zod";
import type { Dispatch, SetStateAction } from "react";
import { type KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";

export const JobDeleteSchema = z.object({
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<boolean>>>(),
});

export type JobDeleteProps = z.infer<typeof JobDeleteSchema>;
