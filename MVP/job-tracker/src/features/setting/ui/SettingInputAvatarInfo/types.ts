import type { ChangeEvent } from "react";
import z from "zod";

export const SettingInputAvatarInfoSchema = z.object({
  handleAddAvatar: z.function({
    input: [z.custom<ChangeEvent<HTMLInputElement>>()],
    output: z.void(),
  }),
});

export type SettingInputAvatarInfoProps = z.infer<
  typeof SettingInputAvatarInfoSchema
>;
