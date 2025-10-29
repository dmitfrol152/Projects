import z from "zod";
import type { Dispatch, SetStateAction } from "react";
import {
  KanbanSchema,
  type KanbanProps,
} from "@/components/DashboardLayout/KanbanBoard/types";
import type { User } from "@supabase/supabase-js";

export const JobEditSchema = z.object({
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<string>>>(),
  isOpenModal: KanbanSchema.nullable(),
  setIsOpenModal: z.custom<Dispatch<SetStateAction<KanbanProps | null>>>(),
  reset: z.function({
    input: [],
    output: z.void(),
  }),
  arrayTagValue: z.array(z.string()),
  user: z.custom<User | null>(),
});

export type JobEditProps = z.infer<typeof JobEditSchema>;
