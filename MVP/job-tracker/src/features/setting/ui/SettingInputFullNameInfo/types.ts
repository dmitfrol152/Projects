import type { Dispatch } from "react";
import z from "zod";

export const SettingInputFullNameInfoSchema = z.object({
  fullName: z.string(),
  setFullName: z.custom<Dispatch<React.SetStateAction<string>>>(),
});

export type SettingInputFullNameInfoProps = z.infer<
  typeof SettingInputFullNameInfoSchema
>;
