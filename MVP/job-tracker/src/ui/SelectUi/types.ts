import { OptionsSchema } from "@/constants/types";
import z from "zod";

export const SelectSchema = z.object({
  label: z.string().optional(),
  options: z.array(OptionsSchema),
  error: z.string().optional(),
  value: z.any().optional(),
  setValue: z.any().optional(),
});

export type SelectProps = z.infer<typeof SelectSchema>;
