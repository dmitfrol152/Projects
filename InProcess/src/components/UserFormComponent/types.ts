import { z } from "zod";

export const UserFormSchema = z.object({
  fullName: z.string().min(1, "Поле не может быть пустым"),
  country: z.string().min(1, "Поле не может быть пустым"),
  city: z.string().min(1, "Поле не может быть пустым"),
  aboutSelf: z.string().optional(),
  // password: z.string().min(8, "Введите не менее 8 символов"),
  // confirmPassword: z.string().min(8, "Введите не менее 8 символов"),
  photo: z.instanceof(File).optional(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Пароли не совпадают",
//   path: ["confirmPassword"],
// });

export type UserFormProps = z.infer<typeof UserFormSchema>;
