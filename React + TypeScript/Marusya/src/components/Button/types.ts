import { z } from "zod";

export const IButtonSchema = z.object({
  title: z.union([z.string().nullable(), z.any()]),
  variant: z
    .enum([
      "reset",
      "primary",
      "secondary",
      "link",
      "login",
      "close",
      "profile",
      "closeFavotites",
    ])
    .optional(),
  type: z.enum(["submit", "reset", "button"]).optional(),
  size: z.enum(["small", "medium", "self", "circle"]).optional(),
  onClick: z.function().args(z.any()).returns(z.void()).optional(),
  isLoading: z.boolean().optional(),
  isDisabled: z.boolean().optional(),
  visible: z.boolean().optional(),
  active: z.boolean().optional(),
  favorite: z.boolean().optional(),
});

export type IButtonProps = z.infer<typeof IButtonSchema>;
