import z from "zod";

export const ButtonSchema = z.object({
  className: z.string().optional(),
  type: z.enum(["submit", "button", "reset"]),
  children: z.any(),
  handleClickButton: z.any().optional(),
  size: z.string(),
  variant: z.string(),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;
