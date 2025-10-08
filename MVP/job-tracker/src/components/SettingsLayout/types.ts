import type { ReactNode } from "react";
import z from "zod";

export const SettingsLayoutSchema = z.object({
  loadingSave: z.boolean(),
  loadingProfile: z.boolean(),
  theme: z.enum(["light", "dark"]),
  toggleTheme: z.function({
    input: [],
    output: z.void(),
  }),
  title: z.custom<ReactNode>(),
  paragraph: z.custom<ReactNode>(),
  fullnameInput: z.custom<ReactNode>(),
  avatarInput: z.custom<ReactNode>(),
  avatarDelete: z.custom<ReactNode>(),
  srcImage: z.string(),
  avatarName: z.string(),
  avatarAddError: z.string(),
  buttonLight: z.custom<ReactNode>(),
  buttonDark: z.custom<ReactNode>(),
  buttonSave: z.custom<ReactNode>(),
  buttonDeleteProfile: z.custom<ReactNode>(),
  buttonDeleteAccount: z.custom<ReactNode>(),
  modal: z.custom<ReactNode>(),
});

export type SettingsLayoutProps = z.infer<typeof SettingsLayoutSchema>;
