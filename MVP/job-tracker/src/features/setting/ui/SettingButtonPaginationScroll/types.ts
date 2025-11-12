import type { Dispatch } from "react";
import z from "zod";

export const SettingButtonPaginationScrollSchema = z.object({
  pagination: z.string(),
  setPagination:
    z.custom<Dispatch<React.SetStateAction<"buttons" | "buttons">>>(),
});

export type SettingButtonPaginationScrollProps = z.infer<
  typeof SettingButtonPaginationScrollSchema
>;
