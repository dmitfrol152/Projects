import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** ZOD Types

export const RegisterSchema = z.object({
  username: z.string().min(5, "Введите не менее 5 символов"),
  email: z
    .string()
    .email("Некорректный email адрес")
    .min(5, "Введите не менее 5 символов"),
  password: z.string().min(5, "Введите не менее 8 символов"),
});

export type registerType = z.infer<typeof RegisterSchema>;

// ** Component

export const RegisterForm = () => {

  // ** Hook-form

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({
    resolver: zodResolver(RegisterSchema),
  });

  // ** Mutation

  const registerMutation = useMutation({
    mutationFn: ({username, email, password}: registerType) => registerUser(username, email, password),
  });

  return (
    <form className="register-form" onSubmit={handleSubmit(({username, email, password}) => {
      registerMutation.mutate({username, email, password});
    })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          {...register("username")}
        />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          {...register("email")} 
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"
          {...register("password")} 
        />
      </FormField>
      <Button type="submit" isLoading={registerMutation.isPending}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
