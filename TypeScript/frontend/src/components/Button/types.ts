import type { ReactNode } from "react";
import { z } from "zod";

export const ButtonSchema = z.object({
  title: z.custom<ReactNode>(),
  variant: z.enum(["link", "main", "secondary", "login"]),
  type: z.enum(["button", "submit"]),
  size: z.enum(["none", "main", "secondary"]),
  onClick: z.any().optional(),
  isLoading: z.boolean().optional(),
  isDisable: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;
