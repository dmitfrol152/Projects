import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  relaseYear: z.number().int().optional(),
  releaseDate: z.string().nullable(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number().int(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string(),
  trailerYoutubeId: z.string().optional(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});

export const MovieListSchema = z.array(MovieSchema);

export const MovieGenresListSchema = z.array(z.string());

export const ParametersSchema = z.object({
  genre: z.string().nullable().optional(),
  pageParam: z.number().nullable().optional(),
  count: z.number().nullable().optional(),
  search: z.string().nullable().optional(),
});

export type IMovie = z.infer<typeof MovieSchema>;

export type MovieList = z.infer<typeof MovieListSchema>;

export type MovieGenresList = z.infer<typeof MovieGenresListSchema>;

export type Parameters = z.infer<typeof ParametersSchema>;
