import { FormField } from "../FormField/FormField";
import { Button } from "../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/User/User";
import IconEmail from "../../assets/images/icon-email.svg?react";
import IconKey from "../../assets/images/icon-key.svg?react";
import styles from "./LoginForm.module.scss";
import { queryClient } from "../../api/queryClient";
import { useDispatch } from "react-redux";
import { authFormVisible } from "../../store/authFormVisibleSlice";
import { FC, useEffect, useState } from "react";
import { emailValue, passwordValue } from "../../store/loginFormSlice";
import { errorAuthType } from "../../store/authTypeSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps, FormSchema, IVisible } from "./type";

export const LoginForm: FC<IVisible> = ({ visible }) => {
  const [successMessage, setSuccessMessgae] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormProps>({ resolver: zodResolver(FormSchema) });

  const emailFieldValue = watch("email");
  const passwordFieldValue = watch("password");

  const emptyValue = !emailFieldValue || !passwordFieldValue;

  const loginFormMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
        setSuccessMessgae("");
      }, 300);

      dispatch(authFormVisible({ authFormVisible: false }));

      setSuccessMessgae("УСПЕШНАЯ АВТОРИЗАЦИЯ!");
    },
    onError: () => {
      dispatch(errorAuthType());
      setTimeout(() => {
        dispatch(emailValue({ email: "" }));
        dispatch(passwordValue({ password: "" }));
      }, 300);
    },
  });

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        reset();
      }, 300);
    }
  }, [reset, visible]);

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(({ email, password }) => {
        loginFormMutation.mutate({ email, password });
      })}
    >
      <div className={styles.loginForm__wrapper}>
        <FormField
          label="Введите email"
          type="text"
          {...register("email")}
          placeholder="Электронная почта"
          icon={<IconEmail />}
          error={errors.email?.message}
        />
        <FormField
          label="Введите пароль"
          type="password"
          {...register("password")}
          placeholder="Пароль"
          icon={<IconKey />}
          error={errors.password?.message}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        title="Войти"
        size="medium"
        isLoading={loginFormMutation.isPending}
        isDisabled={emptyValue}
      />
      {successMessage && (
        <span className={styles.loginForm__message}>{successMessage}</span>
      )}
    </form>
  );
};

export default LoginForm;
