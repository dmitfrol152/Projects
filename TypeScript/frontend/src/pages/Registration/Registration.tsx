import { useForm } from "react-hook-form";
import styles from "./Registration.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField/InputField";
import { FormSchema } from "./types";
import { Button } from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/Profile/Profile";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export const Registration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(FormSchema) });
  const [errorValue, setErrorValue] = useState<boolean>(false);
  const navigate = useNavigate();

  const name = watch("username");
  const password = watch("password");

  const emptyValue = !name || !password;

  const registrationFormSubmit = useMutation({
    mutationFn: registerUser,
    mutationKey: ["profile", "me"],
    onSuccess: () => {
      navigate("/login");
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
    <div className={styles.registration}>
      <div className={styles.registration__modal}>
        <h2 className={styles.registration__modalTitle}>Регистрация</h2>
        {errorValue ? (
          <span className={styles.registration__modalError}>
            Пользователь уже существует!
          </span>
        ) : null}
        <form
          className={styles.registration__modalForm}
          onSubmit={handleSubmit(({ username, password }) => {
            registrationFormSubmit.mutate({ username, password });
          })}
        >
          <div className={styles.registration__modalInputs}>
            <InputField
              id="name"
              label="Регистрация"
              placeholder="Логин"
              type="text"
              errors={errors.username?.message}
              {...register("username")}
            />
            <InputField
              id="password"
              label="Регистрация"
              placeholder="Пароль"
              type="password"
              errors={errors.password?.message}
              {...register("password")}
            />
          </div>
          <div className={styles.registration__modalButtons}>
            <Button
              title="Зарегестрироваться"
              variant="login"
              type="submit"
              size="main"
              isDisable={emptyValue ? true : false}
              isLoading={registrationFormSubmit.isPending}
            />
            <Link className={styles.registration__modalButtonsLink} to="/login">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
