import type { Dispatch } from "react";
import z from "zod";

export const SettingButtonPaginationButtonsSchema = z.object({
  pagination: z.string(),
  setPagination:
    z.custom<Dispatch<React.SetStateAction<"buttons" | "buttons">>>(),
});

export type SettingButtonPaginationButtonsProps = z.infer<
  typeof SettingButtonPaginationButtonsSchema
>;
