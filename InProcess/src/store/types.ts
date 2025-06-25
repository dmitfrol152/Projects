import { z } from "zod";

export const AuthTypeSchema = z.object({
  authTypeValue: z.string(),
});

export type AuthTypeProps = z.infer<typeof AuthTypeSchema>;

export const AuthTypeObjectSchema = z.object({
  authTypeName: AuthTypeSchema,
});

export type AuthTypeObjectProps = z.infer<typeof AuthTypeObjectSchema>;

export const AccountModalSchema = z.object({
  accountModalValue: z.boolean(),
});

export type AccountModalProps = z.infer<typeof AccountModalSchema>;

export const AccountModalObjectSchema = z.object({
  accountModalName: AccountModalSchema,
});

export type AccountModalObjectProps = z.infer<typeof AccountModalObjectSchema>;

export const EditFormSchema = z.object({
  editFormValue: z.boolean(),
});

export type EditFormProps = z.infer<typeof EditFormSchema>;

export const EditFormObjectSchema = z.object({
  editFormStatus: EditFormSchema,
});

export type EditFormObjectProps = z.infer<typeof EditFormObjectSchema>;
