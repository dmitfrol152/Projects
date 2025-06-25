import { z } from "zod";

export const RegistrationFormSchema = z
  .object({
    email: z
      .string()
      .email("Почта (ошибка): Некорректный email адрес")
      .min(5, "Почта (ошибка): Введите не менее 5 символов"),
    password: z.string().min(8, "Пароль (ошибка): Введите не менее 8 символов"),
    confirmPassword: z
      .string()
      .min(8, "Пароль (ошибка): Введите не менее 8 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegistrationFormProps = z.infer<typeof RegistrationFormSchema>;
