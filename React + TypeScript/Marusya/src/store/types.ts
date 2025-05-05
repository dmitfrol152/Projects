import { z } from "zod";

export const ISearchReducerSchema = z.object({
  searchValue: z.string(),
});

export type ISearchReducer = z.infer<typeof ISearchReducerSchema>;

export const IAuthFormVisibleReducerSchema = z.object({
  authFormVisible: z.boolean(),
});

export type IAuthFormVisibleReducer = z.infer<
  typeof IAuthFormVisibleReducerSchema
>;

export const authTypeReducerSchema = z.object({
  authType: z.string(),
});

export type authTypeReducer = z.infer<typeof authTypeReducerSchema>;

export const registrationFormReducerSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type registrationFormReducer = z.infer<
  typeof registrationFormReducerSchema
>;

export const loginFormReducerSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type loginFormReducer = z.infer<typeof loginFormReducerSchema>;
