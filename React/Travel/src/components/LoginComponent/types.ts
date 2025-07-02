import z from "zod";

export const FormSchema = z.object({
  email: z
    .string()
    .email("Некорректный email адрес")
    .min(5, "Введите не менее 5 символов"),
  password: z.string().min(8, "Введите не менее 8 символов"),
});

export type FormProps = z.infer<typeof FormSchema>;
