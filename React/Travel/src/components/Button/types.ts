import { z } from "zod";

export const ButtonSchema = z.object({
  title: z.union([z.string().nullable(), z.any()]),
  variant: z
    .enum(["primary", "secondary", "link", "linkBlack", "svg"])
    .optional(),
  type: z.enum(["button", "submit"]).optional(),
  size: z.enum(["main", "none", "svg"]).optional(),
  onClick: z.function().args(z.any()).returns(z.void()).optional(),
  isLoading: z.boolean().optional(),
  isDisable: z.boolean().optional(),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;
