import { z } from "zod";

export const UserSchema = z.object({
  full_name: z.string(),
  city: z.string(),
  country: z.string(),
  bio: z.string(),
  photo: z.string().optional(),
});

export type UserProps = z.infer<typeof UserSchema>;

export const UserDataSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserDataProps = z.infer<typeof UserDataSchema>;

export const EditUserSchema = z.object({
  full_name: z.string(),
  city: z.string(),
  country: z.string(),
  bio: z.string().optional(),
  photo: z.string().optional(),
});

export type EditUserProps = z.infer<typeof EditUserSchema>;

export const EditPasswordUserSchema = z.object({
  password: z.string(),
});

export type EditPasswordUserProps = z.infer<typeof EditPasswordUserSchema>;

export const EditPasswordUserReturnSchema = z.object({
  message: z.string(),
});

export type EditPasswordUserReturnProps = z.infer<
  typeof EditPasswordUserReturnSchema
>;
