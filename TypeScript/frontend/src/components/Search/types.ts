import type { ElementType } from "react";
import { z } from "zod";

export const SearchSchema = z.object({
  icon: z.custom<ElementType>(),
  type: z.string(),
  label: z.string(),
  placeholder: z.string(),
  name: z.string(),
  value: z.string(),
  onChange: z.any().optional(),
  onClick: z.any().optional(),
});

export type SearchProps = z.infer<typeof SearchSchema>;
