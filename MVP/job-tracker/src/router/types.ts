import z from "zod";

export const PrivateRouterSchema = z.object({
  children: z.any(),
});

export type PrivateRouterProps = z.infer<typeof PrivateRouterSchema>;
