import z from "zod";

export const ActionsSchema = z.object({
  id: z.number(),
  image_url: z.string(),
  description: z.string(),
});

export type ActionsProps = z.infer<typeof ActionsSchema>;
