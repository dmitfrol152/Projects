import type { ReactNode } from "react";
import z from "zod";

export const PrivateRouterSchema = z.object({
  children: z.custom<ReactNode>(),
});

export type PrivateRouterProps = z.infer<typeof PrivateRouterSchema>;
