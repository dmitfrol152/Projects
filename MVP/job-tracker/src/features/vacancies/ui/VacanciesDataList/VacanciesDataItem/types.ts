import { DashboardFormResolverSchema } from "@shared/ui/Form/types";
import z from "zod";

export const AreaSchema = z.object({
  name: z.string(),
});

export const EmployerSchema = z.object({
  name: z.string(),
});

export const SalarySchema = z.object({
  from: z.number().nullable(),
  to: z.number().nullable(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
});

export const DataSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: AreaSchema,
  employer: EmployerSchema,
  published_at: z.string(),
  alternate_url: z.string(),
  salary: SalarySchema.nullable(),
  experience: ExperienceSchema,
});

export type DataProps = z.infer<typeof DataSchema>;

export const DataItemSchema = z.object({
  vacancy: DataSchema,
  handleSubmitNewFormDashboard: z.function({
    input: [DashboardFormResolverSchema],
    output: z.void(),
  }),
});

export type DataItemProps = z.infer<typeof DataItemSchema>;

export const DataScrollSchema = z.object({
  items: z.array(DataSchema),
});

export type DataScrollProps = z.infer<typeof DataScrollSchema>;
