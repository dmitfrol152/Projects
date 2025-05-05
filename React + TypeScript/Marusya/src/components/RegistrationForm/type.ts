import { z } from "zod";

export const IRegistrationFormPropsSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export const IRegistrationFormSchema = z.object({
  registrationForm: IRegistrationFormPropsSchema,
});

export type IRegistrationForm = z.infer<typeof IRegistrationFormSchema>;

export const FormSchema = z
  .object({
    email: z
      .string()
      .email("Некорректный email адрес")
      .min(5, "Введите не менее 5 символов"),
    name: z.string().min(3, "Введите не менее 3 символов"),
    surname: z.string().min(3, "Введите не менее 3 символов"),
    password: z.string().min(8, "Введите не менее 8 символов"),
    confirmPassword: z.string().min(8, "Введите не менее 8 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type FormProps = z.infer<typeof FormSchema>;
