import { z } from "zod";

export const AuthUserSchema = z.object({
  authUserValue: z.boolean(),
});

export type AuthUserProps = z.infer<typeof AuthUserSchema>;

export const audioGroupChoiceSchema = z.object({
  audioGroupChoiceValue: z.boolean().nullable(),
});

export type audioGroupChoiceProps = z.infer<typeof audioGroupChoiceSchema>;

export const SearchSchema = z.object({
  searchValue: z.string(),
});

export type SearchValue = z.infer<typeof SearchSchema>;

export const AudioPlayer = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  size_mb: z.number(),
  encoded_audio: z.string(),
  autoPlay: z.boolean(),
});

export const AudioPlayerSchema = z.object({
  audioPlayerValue: AudioPlayer.nullable(),
});

export type AudioPlayerProps = z.infer<typeof AudioPlayerSchema>;

export const AudioPlayerNameSchema = z.object({
  audioPlayerName: AudioPlayerSchema,
});

export type AudioPlayerNameProps = z.infer<typeof AudioPlayerNameSchema>;

export const AudioPlayerActiveImageSchema = z.object({
  audioPlayerActiveImageValue: z.string().optional(),
});

export type AudioPlayerActiveImageProps = z.infer<
  typeof AudioPlayerActiveImageSchema
>;

export const AudioPlayerNameActiveImageSchema = z.object({
  audioPlayerActiveImageName: AudioPlayerActiveImageSchema,
});

export type AudioPlayerNameActiveImageProps = z.infer<
  typeof AudioPlayerNameActiveImageSchema
>;
