import { ActionsSchema } from "@/types/actionsType";
import z from "zod";

export const SlideSchema = z.object({
  slide: ActionsSchema,
});

export type SlideProps = z.infer<typeof SlideSchema>;
