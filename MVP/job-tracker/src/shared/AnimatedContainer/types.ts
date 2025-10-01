import type { Dispatch, ReactNode, SetStateAction } from "react";
import z from "zod";

export const AnimatedContainerSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.string().optional(),
  transformAnimation: z.number().optional(),
  setHover: z.custom<Dispatch<SetStateAction<boolean>>>().optional(),
});

export type AnimatedContainerProps = z.infer<typeof AnimatedContainerSchema>;
