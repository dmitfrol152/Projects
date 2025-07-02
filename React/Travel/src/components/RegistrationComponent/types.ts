import { z } from "zod";

export const RegistrationFormSchema = z
  .object({
    email: z
      .string()
      .email("Некорректный email адрес")
      .min(5, "Введите не менее 5 символов"),
    password: z.string().min(8, "Введите не менее 8 символов"),
    confirmPassword: z.string().min(8, "Введите не менее 8 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegistrationFormProps = z.infer<typeof RegistrationFormSchema>;
