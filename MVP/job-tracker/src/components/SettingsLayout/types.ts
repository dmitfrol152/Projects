import z from "zod";

export const SettingsLayoutSchema = z.object({
  title: z.any(),
  paragraph: z.any(),
});

export type SettingsLayoutProps = z.infer<typeof SettingsLayoutSchema>;
