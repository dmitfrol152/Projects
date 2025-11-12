import type { ReactNode } from "react";
import z from "zod";

export const LinksSchema = z.object({
  title: z.string(),
  path: z.string(),
});

export type LinksProps = z.infer<typeof LinksSchema>;

export const OptionsSchema = z.object({
  optionValue: z.string(),
  optionName: z.string(),
});

export type OptionsProps = z.infer<typeof OptionsSchema>;

export const ColumnsSchema = z.object({
  title: z.string(),
  key: z.string(),
  active: z.boolean(),
});

export type ColumnsProps = z.infer<typeof ColumnsSchema>;

export const SocialSchema = z.object({
  to: z.string(),
  icon: z.custom<ReactNode>(),
  classLink: z.string(),
  target: z.string(),
  rel: z.string(),
});

export type SocialProps = z.infer<typeof SocialSchema>;
