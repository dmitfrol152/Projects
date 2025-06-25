import { z } from "zod";
import { EditUserSchema } from "../../api/User/types";

export const UserInfoPropsSchema = z.object({
  data: EditUserSchema.optional(),
  loading: z.boolean().optional(),
});

export type UserInfoProps = z.infer<typeof UserInfoPropsSchema>;
