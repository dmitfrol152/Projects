import { MarkSchema } from "@/types/productType";
import z from "zod";

export const MarkItemSchema = z.object({
  mark: MarkSchema,
});

export type MarkItemProps = z.infer<typeof MarkItemSchema>;
