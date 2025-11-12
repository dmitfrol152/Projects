import z from "zod";

export const SettingButtonDeleteProfileSchema = z.object({
  handleConfirmDeleteProfile: z.function({
    input: [],
    output: z.void(),
  }),
});

export type SettingButtonDeleteProfileProps = z.infer<
  typeof SettingButtonDeleteProfileSchema
>;
