import { MarkSchema } from "@/types/productType";
import z from "zod";

export const MarksSchema = z.object({
  marks: z.array(MarkSchema),
});

export type MarksProps = z.infer<typeof MarksSchema>;
