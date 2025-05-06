import { z } from "zod";

export const RegistrationUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
});

export const LoginUser = z.object({
  email: z.string(),
  password: z.string(),
});

export type RegistrationUserProps = z.infer<typeof RegistrationUserSchema>;

export type LoginUserProps = z.infer<typeof LoginUser>;
