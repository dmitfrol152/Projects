import { z } from "zod";
import { EditUserSchema } from "../../api/User/types";

export const UserFormSchema = z
  .object({
    fullName: z.string().min(1, "Поле не может быть пустым"),
    country: z.string().min(1, "Поле не может быть пустым"),
    city: z.string().min(1, "Поле не может быть пустым"),
    bio: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    photo: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.password && !data.confirmPassword) return;
    if (data.password && data.password.length < 8) {
      ctx.addIssue({
        code: "too_small",
        minimum: 8,
        inclusive: true,
        type: "string",
        message: "Введите не менее 8 символов",
        path: ["password"],
      });
    }

    if (data.confirmPassword && data.confirmPassword.length < 8) {
      ctx.addIssue({
        code: "too_small",
        minimum: 8,
        inclusive: true,
        type: "string",
        message: "Введите не менее 8 символов",
        path: ["confirmPassword"],
      });
    }

    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  });

export type UserFormProps = z.infer<typeof UserFormSchema>;

export const UserFormEntrySchema = z.object({
  data: EditUserSchema.optional(),
  loading: z.boolean().optional(),
});

export type UserFormEntryProps = z.infer<typeof UserFormEntrySchema>;
