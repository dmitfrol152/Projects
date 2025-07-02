import { z } from "zod";
import { UserSchema } from "../../api/User/types";

export const UserPropsSchema = z.object({
  data: UserSchema.optional(),
  loading: z.boolean().optional(),
});

export type UserProps = z.infer<typeof UserPropsSchema>;
