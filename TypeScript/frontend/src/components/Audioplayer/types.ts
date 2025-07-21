import { z } from "zod";

export const TracksSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  size_mb: z.number(),
  encoded_audio: z.string(),
  autoPlay: z.boolean()
});

export const TrackPropsSchema = z.object({
  track: TracksSchema,
});

export type TrackProps = z.infer<typeof TrackPropsSchema>;
