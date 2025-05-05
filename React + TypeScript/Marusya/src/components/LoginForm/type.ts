import { z } from "zod";

export const ILoginFormPropsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const ILoginFormSchema = z.object({
  loginForm: ILoginFormPropsSchema,
});

export type ILoginForm = z.infer<typeof ILoginFormSchema>;

export const FormSchema = z.object({
  email: z
    .string()
    .email("Некорректный email адрес")
    .min(5, "Введите не менее 5 символов"),
  password: z.string().min(8, "Введите не менее 8 символов"),
});

export type FormProps = z.infer<typeof FormSchema>;

export const IVisibleSchema = z.object({
  visible: z.boolean(),
});

export type IVisible = z.infer<typeof IVisibleSchema>;
