import { z } from "zod";

export const DataTracksSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  size_mb: z.number(),
  encoded_audio: z.string(),
});

export type DataTracksProps = z.infer<typeof DataTracksSchema>;

export const DataSchema = z.object({
  track: DataTracksSchema,
  index: z.number(),
  inFavorite: z.boolean(),
  openedModalId: z.number().nullable(),
  setOpenedModalId: z.any(),
});

export type DataProps = z.infer<typeof DataSchema>;

export const trackIdShema = z.object({
  trackId: z.number(),
});

export type trackIdProps = z.infer<typeof trackIdShema>;
