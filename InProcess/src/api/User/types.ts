import { z } from "zod";

export const UserSchema = z.object({
  full_name: z.string(),
  city: z.string(),
  country: z.string(),
  bio: z.string(),
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
  photo: z.instanceof(File).optional(),
});

export type EditUserProps = z.infer<typeof EditUserSchema>;
