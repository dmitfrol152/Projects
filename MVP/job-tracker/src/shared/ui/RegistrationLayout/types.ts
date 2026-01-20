import type { ReactNode } from "react";
import z from "zod";

export const RegistrationLayoutSchema = z.object({
  title: z.custom<ReactNode>(),
  form: z.custom<ReactNode>(),
  error: z.string().nullable(),
  width: z.number(),
});

export type RegistrationLayoutProps = z.infer<typeof RegistrationLayoutSchema>;
