import { z } from "zod";

export const MovieIdSchema = z.string().optional();

export type MovieIdProp = z.infer<typeof MovieIdSchema>;
