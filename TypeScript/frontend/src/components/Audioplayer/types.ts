import { z } from "zod";

export const TracksSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  size_mb: z.number(),
  encoded_audio: z.string(),
  autoPlay: z.boolean(),
});

export const TracksArraySchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  size_mb: z.number(),
  encoded_audio: z.string(),
});

export const TrackPropsSchema = z.object({
  track: TracksSchema,
  tracks: z.array(TracksArraySchema).optional(),
  favoritesTracks: z.array(TracksArraySchema).optional(),
  currentTrackIndex: z.number().optional(),
  setCurrentTrackIndex: z.any(),
});

export type TrackProps = z.infer<typeof TrackPropsSchema>;

export const trackIdShema = z.object({
  trackId: z.number(),
});

export type trackIdProps = z.infer<typeof trackIdShema>;
