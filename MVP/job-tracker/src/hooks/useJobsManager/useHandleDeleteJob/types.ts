import z from "zod";
import type { Dispatch, SetStateAction } from "react";
import { type KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type { User } from "@supabase/supabase-js";

export const JobDeleteSchema = z.object({
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<string>>>(),
  user: z.custom<User | null>(),
});

export type JobDeleteProps = z.infer<typeof JobDeleteSchema>;
