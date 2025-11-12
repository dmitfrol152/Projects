import z from "zod";

export const SettingButtonAvatarDeleteSchema = z.object({
  handleDeleteAvatar: z.function({
    input: [],
    output: z.void(),
  }),
  avatarUrl: z.string().nullable(),
});

export type SettingButtonAvatarDeleteProps = z.infer<
  typeof SettingButtonAvatarDeleteSchema
>;
