import z from "zod";

export const NavigationSchema = z.object({
  className: z.string(),
  isVisibleSearchButton: z.boolean().optional(),
  isVisibleExitButton: z.boolean().optional(),
  handleClickSearch: z.function().optional(),
});

export type NavigationProps = z.infer<typeof NavigationSchema>;
