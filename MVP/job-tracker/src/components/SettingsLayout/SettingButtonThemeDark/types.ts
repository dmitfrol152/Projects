import type { Dispatch } from "react";
import z from "zod";

export const SettingButtonThemeDarkSchema = z.object({
  theme: z.enum(["light", "dark"]),
  setTheme: z.custom<Dispatch<React.SetStateAction<"light" | "dark">>>(),
});

export type SettingButtonThemeDarkProps = z.infer<
  typeof SettingButtonThemeDarkSchema
>;
