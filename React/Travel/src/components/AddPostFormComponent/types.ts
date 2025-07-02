import z from "zod";

export const FormSchema = z.object({
  title: z
    .string()
    .min(1, "Поле не может быть пустым")
    .max(255, "Введите не более 255 символов"),
  description: z
    .string()
    .min(8, "Введите не менее 8 символов")
    .max(2000, "Введите не более 2000 символов"),
  country: z
    .string()
    .min(1, "Поле не может быть пустым")
    .max(255, "Введите не более 255 символов"),
  city: z
    .string()
    .min(1, "Поле не может быть пустым")
    .max(255, "Введите не более 255 символов"),
  photo: z
    .any()
    .refine((file) => file && file.length === 1, "Фото обязательно"),
});

export type FormProps = z.infer<typeof FormSchema>;
