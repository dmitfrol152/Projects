import { z } from "zod";

export const FavoritesGetSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  size_mb: z.number(),
  encoded_audio: z.string(),
});

export type FavoritesGetProps = z.infer<typeof FavoritesGetSchema>;

export const FavoritesGetArraySchema = z.array(FavoritesGetSchema);

export type FavoritesGetArrayProps = z.infer<typeof FavoritesGetArraySchema>;

export const FavoritesIdTracktSchema = z.object({
  trackId: z.number(),
});

export type FavoritesIdTracktProps = z.infer<typeof FavoritesIdTracktSchema>;
