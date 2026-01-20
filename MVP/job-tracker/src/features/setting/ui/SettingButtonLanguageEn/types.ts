import z from "zod";

export const SettingButtonLanguageEnSchema = z.object({
  currentLanguage: z.string(),
  toggleLanguage: z.function({
    input: [],
    output: z.void(),
  }),
});

export type SettingButtonLanguageEnProps = z.infer<
  typeof SettingButtonLanguageEnSchema
>;
