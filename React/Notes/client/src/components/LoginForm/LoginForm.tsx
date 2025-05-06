import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** ZOD Types

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Некорректный email адрес")
    .min(5, "Введите не менее 5 символов"),
  password: z.string()
    .min(8, "Введите не менее 8 символов"),
});

export type LoginType = z.infer<typeof LoginSchema>;

// ** Components

export const LoginForm = () => {
  // ** Hook-form

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  // ** Mutation

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginType) => loginUser(email, password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password });
      })}
    >
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input 
          type="password"
          {...register("password")} 
        />
      </FormField>
      <Button type="submit" isLoading={loginMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};
