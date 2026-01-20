import z from "zod";

export const SettingButtonLanguageRuSchema = z.object({
  currentLanguage: z.string(),
  toggleLanguage: z.function({
    input: [],
    output: z.void(),
  }),
});

export type SettingButtonLanguageRuProps = z.infer<
  typeof SettingButtonLanguageRuSchema
>;
