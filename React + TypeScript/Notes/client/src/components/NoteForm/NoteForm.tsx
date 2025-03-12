import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/Note";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** ZOD Types

export const CreateNoteSchema = z.object({
  title: z.string().min(5, "Введите не менее 5 символов"),
  text: z
    .string()
    .min(10, "Введите не менее 10 символов")
    .max(300, "Введите не более 300 символов"),
});

export type CreateNoteType = z.infer<typeof CreateNoteSchema>;

// ** Component

export const NoteForm = () => {
  
  // ** Hook-form

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateNoteType>({
    resolver: zodResolver(CreateNoteSchema),
  });

  // ** Mutation create note

  const createNoteMutation = useMutation({
    mutationFn: ({ title, text }: CreateNoteType) => createNote(title, text),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      reset();
    },
  });

  return (
    <form
      className="note-form"
      onSubmit={handleSubmit(({ title, text }) => {
        createNoteMutation.mutate({ title, text });
      })}
    >
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input {...register("title")} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")} />
      </FormField>
      <Button type="submit" isLoading={createNoteMutation.isPending}>
        Сохранить
      </Button>
      {createNoteMutation.isError && (
        <span>{createNoteMutation.error?.message}</span>
      )}
      {createNoteMutation.isSuccess && (
        <span style={{ color: "green" }}>
          {"Заметка успешно добавлена в конец списка"}
        </span>
      )}
    </form>
  );
};
