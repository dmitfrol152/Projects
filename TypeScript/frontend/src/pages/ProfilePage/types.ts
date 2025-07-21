import { z } from "zod";

export const AuthUserResult = z.object({
  authUserValue: z.boolean(),
});

export const AuthUserResultSchema = z.object({
  authUserName: AuthUserResult,
});

export type AuthUserResultProps = z.infer<typeof AuthUserResultSchema>;
