import z from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Поле не может быть пустым")
    .max(255, "Введите не более 255 символов"),
  review: z
    .string()
    .min(8, "Введите не менее 8 символов")
    .max(600, "Введите не более 600 символов"),
});

export type FormProps = z.infer<typeof FormSchema>;

export const FormPropsSchema = z.object({
  postId: z.string().optional(),
});

export type FormPropsProps = z.infer<typeof FormPropsSchema>;
