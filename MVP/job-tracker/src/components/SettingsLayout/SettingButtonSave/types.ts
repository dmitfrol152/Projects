import z from "zod";

export const SettingButtonSaveSchema = z.object({
  handleSave: z.function({
    input: [],
    output: z.void(),
  }),
});

export type SettingButtonSaveProps = z.infer<typeof SettingButtonSaveSchema>;
