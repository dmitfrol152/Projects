import type { ReactNode } from "react";
import z from "zod";

export const LoginLayoutSchema = z.object({
  title: z.custom<ReactNode>(),
  form: z.custom<ReactNode>(),
  error: z.string().nullable(),
  width: z.number(),
});

export type LoginLayoutProps = z.infer<typeof LoginLayoutSchema>;
