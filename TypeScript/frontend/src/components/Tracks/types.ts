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

export const DataTracksArraySchema = z.array(DataTracksSchema);

export type DataTracksArrayProps = z.infer<typeof DataTracksArraySchema>;

export const DataSchema = z.object({
  data: DataTracksArraySchema.optional(),
});

export type DataProps = z.infer<typeof DataSchema>;
