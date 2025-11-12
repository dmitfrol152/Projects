import type { Dispatch } from "react";
import z from "zod";

export const SettingButtonThemeLightSchema = z.object({
  theme: z.enum(["light", "dark"]),
  setTheme: z.custom<Dispatch<React.SetStateAction<"light" | "dark">>>(),
});

export type SettingButtonThemeLightProps = z.infer<
  typeof SettingButtonThemeLightSchema
>;
