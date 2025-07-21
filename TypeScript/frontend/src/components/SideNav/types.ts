import { z } from "zod";

export const SideNavSchema = z.object({
  userIsAuth: z.boolean(),
});

export type SideNavProps = z.infer<typeof SideNavSchema>;

export const audioGroupChoice = z.object({
  audioGroupChoiceValue: z.boolean(),
});

export const audioGroupChoiceSchema = z.object({
  audioGroupChoiceName: audioGroupChoice,
});

export type audioGroupChoiceProps = z.infer<typeof audioGroupChoiceSchema>;
