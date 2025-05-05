import { z } from "zod";

export const VisibleTrailerSchema = z.object({
  visible: z.boolean(),
  onClose: z.function().optional(),
  trailerId: z.string().optional(),
  backdropUrl: z.string().nullable(),
  title: z.string(),
});

export type VisibleTrailerProps = z.infer<typeof VisibleTrailerSchema>;
