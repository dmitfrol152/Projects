import { z } from "zod";

export const TracksGetSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  size_mb: z.number(),
  encoded_audio: z.string(),
});

export type TracksGetProps = z.infer<typeof TracksGetSchema>;

export const TracksGetArraySchema = z.array(TracksGetSchema);

export type TracksGetArrayProps = z.infer<typeof TracksGetArraySchema>;
