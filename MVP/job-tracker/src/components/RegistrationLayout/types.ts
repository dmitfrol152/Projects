import z from "zod";

export const RegistrationLayoutSchema = z.object({
  title: z.any(),
  form: z.any(),
  error: z.string().nullable(),
});

export type RegistrationLayoutProps = z.infer<typeof RegistrationLayoutSchema>;
