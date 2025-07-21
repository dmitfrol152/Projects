import { z } from "zod";

export const valueState = z.object({
  searchValue: z.string(),
});

export const valueSearchSchema = z.object({
  searchName: valueState,
});

export type valueSearchProps = z.infer<typeof valueSearchSchema>;
