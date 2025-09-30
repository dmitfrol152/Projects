import type { ReactNode } from "react";
import z from "zod";

export const AnimatedContainerSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.string().optional(),
  transformAnimation: z.number().optional(),
});

export type AnimatedContainerProps = z.infer<typeof AnimatedContainerSchema>;
