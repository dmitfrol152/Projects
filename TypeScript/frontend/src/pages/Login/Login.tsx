import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField/InputField";
import { FormSchema } from "./types";
import { Button } from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/Profile/Profile";
import { queryClient } from "../../api/queryClient";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authUserAction } from "../../store/authUserSlice";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(FormSchema) });
  const [errorValue, setErrorValue] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = watch("username");
  const password = watch("password");

  const emptyValue = !name || !password;

  const loginFormSubmit = useMutation({
    mutationFn: loginUser,
    mutationKey: ["profile", "me"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
      navigate("/");
      dispatch(authUserAction({ authUserValue: true }));
    },
    onError: () => {
      setErrorValue(true);
    },
  });

  useEffect(() => {
    if (errorValue) {
      setErrorValue(false);
    }
  }, [name, password]);

  return (
    <div className={styles.login}>
      <div className={styles.login__modal}>
        <h2 className={styles.login__modalTitle}>Авторизация</h2>
        {errorValue ? (
          <span className={styles.login__modalError}>
            Пользователь не найден!
          </span>
        ) : null}
        <form
          className={styles.login__modalForm}
          onSubmit={handleSubmit(({ username, password }) => {
            loginFormSubmit.mutate({ username, password });
          })}
        >
          <div className={styles.login__modalInputs}>
            <InputField
              id="name"
              label="Авторизация"
              placeholder="Логин"
              type="text"
              errors={errors.username?.message}
              {...register("username")}
            />
            <InputField
              id="password"
              label="Авторизация"
              placeholder="Пароль"
              type="password"
              errors={errors.password?.message}
              {...register("password")}
            />
          </div>
          <div className={styles.login__modalButtons}>
            <Button
              title="Войти"
              variant="login"
              type="submit"
              size="secondary"
              isDisable={emptyValue ? true : false}
              isLoading={loginFormSubmit.isPending}
            />
            <Link className={styles.login__modalButtonsLink} to="/registration">
              Зарегестрироваться
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
