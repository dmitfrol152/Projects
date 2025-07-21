import { z } from "zod";

export const AuthUserResult = z.object({
  authUserValue: z.boolean(),
});

export const AuthUserResultSchema = z.object({
  authUserName: AuthUserResult,
});

export type AuthUserResultProps = z.infer<typeof AuthUserResultSchema>;

export const ValueState = z.object({
  searchValue: z.string(),
});

export const ValueSearchSchema = z.object({
  searchName: ValueState,
});

export type ValueSearchProps = z.infer<typeof ValueSearchSchema>;
