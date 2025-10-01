import z from "zod";
import type { Dispatch, SetStateAction } from "react";
import {
  KanbanSchema,
  type KanbanProps,
} from "@/components/DashboardLayout/KanbanBoard/types";

export const JobEditSchema = z.object({
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<boolean>>>(),
  isOpenModal: KanbanSchema.nullable(),
  setIsOpenModal: z.custom<Dispatch<SetStateAction<KanbanProps | null>>>(),
  reset: z.function({
    input: [],
    output: z.void(),
  }),
  arrayTagValue: z.array(z.string()),
});

export type JobEditProps = z.infer<typeof JobEditSchema>;
