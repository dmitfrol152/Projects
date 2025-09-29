import z from "zod";

export const HomeLayoutSchema = z.object({
  header: z.any(),
  children: z.any(),
  footer: z.any(),
});

export type HomeLayoutProps = z.infer<typeof HomeLayoutSchema>;
