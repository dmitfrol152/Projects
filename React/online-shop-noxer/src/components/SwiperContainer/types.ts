import { ActionsSchema } from "@/types/actionsType";
import z from "zod";

export const BannersSchema = z.object({
  banners: z.array(ActionsSchema),
});

export type BannersProps = z.infer<typeof BannersSchema>;
