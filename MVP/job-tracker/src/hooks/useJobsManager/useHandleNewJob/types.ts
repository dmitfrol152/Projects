import z from "zod";
import type { User } from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";

export const JobAddSchema = z.object({
  user: z.custom<User | null>(),
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<boolean>>>(),
  setSuccessAddInKanban: z.custom<Dispatch<SetStateAction<boolean>>>(),
  reset: z
    .function({
      input: [],
      output: z.void(),
    })
    .optional(),
});

export type JobAddProps = z.infer<typeof JobAddSchema>;
