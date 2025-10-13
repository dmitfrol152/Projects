import type { ReactNode } from "react";
import z from "zod";

export const NotificationLayoutSchema = z.object({
  title: z.custom<ReactNode>(),
  paragraph: z.custom<ReactNode>(),
  form: z.custom<ReactNode>(),
  reminders: z.custom<ReactNode>(),
});

export type NotificationLayoutProps = z.infer<typeof NotificationLayoutSchema>;
