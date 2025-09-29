import z from "zod";

export const LoginLayoutSchema = z.object({
  title: z.any(),
  form: z.any(),
  error: z.string().nullable(),
});

export type LoginLayoutProps = z.infer<typeof LoginLayoutSchema>;
