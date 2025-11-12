import type { Dispatch, SetStateAction } from "react";
import {
  KanbanSchema,
  type KanbanProps,
} from "@features/kanban/KanbanBoard/types";
import z from "zod";
import type { User } from "@supabase/supabase-js";

export const JobsManagerAddSchema = z.object({
  reset: z.function({
    input: [],
    output: z.void(),
  }),
});

export type JobsManagerAddProps = z.infer<typeof JobsManagerAddSchema>;

export const JobsManagerEditSchema = z.object({
  isOpenModal: KanbanSchema.nullable(),
  setIsOpenModal: z.custom<Dispatch<SetStateAction<KanbanProps | null>>>(),
  reset: z.function({
    input: [],
    output: z.void(),
  }),
  arrayTagValue: z.array(z.string()),
});

export type JobsManagerEditProps = z.infer<typeof JobsManagerEditSchema>;

export const TagFiltersSchema = z.object({
  tagName: z.string(),
  active: z.boolean(),
});

export type TagFiltersProps = z.infer<typeof TagFiltersSchema>;

export const JobDeleteSchema = z.object({
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<string>>>(),
  user: z.custom<User | null>(),
});

export type JobDeleteProps = z.infer<typeof JobDeleteSchema>;

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

export const JobAddSchema = z.object({
  user: z.custom<User | null>(),
  setJobs: z.custom<Dispatch<SetStateAction<KanbanProps[] | []>>>(),
  setErrorDataBase: z.custom<Dispatch<SetStateAction<string>>>(),
  setSuccessAddInKanban: z.custom<Dispatch<SetStateAction<boolean>>>(),
  reset: z
    .function({
      input: [],
      output: z.void(),
    })
    .optional(),
});

export type JobAddProps = z.infer<typeof JobAddSchema>;
