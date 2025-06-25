import styles from "./LoginComponent.module.scss";
import FormField from "../FormField/FormField";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { setAuthType, setPostsType } from "../../store/authTypeSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./types";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/User/User";

export const LoginComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: zodResolver(FormSchema) });
  const dispatch = useDispatch();

  const loginFormSubmit = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      dispatch(setPostsType());
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const emptyValue = !emailValue || !passwordValue;

  const handleRegistration = () => {
    dispatch(setAuthType());
  };

  return (
    <section className={styles.login}>
      <div className="container">
        <form
          className={styles.login__form}
          onSubmit={handleSubmit(({ email, password }) => {
            loginFormSubmit.mutate({ email, password });
          })}
        >
          <div className={styles.login__formWrapper}>
            <h3 className={styles.login__formTitle}>Вход в профиль</h3>
            {errors.email ? (
              <span className={styles.login__formError}>
                {errors.email?.message}
              </span>
            ) : errors.password ? (
              <span className={styles.login__formError}>
                {errors.password?.message}
              </span>
            ) : null}
            <div className={styles.login__formInputs}>
              <FormField
                id="emailLabel"
                label="Логин"
                type="text"
                placeholder="Email"
                error={Boolean(errors.email?.message)}
                {...register("email")}
              />
              <FormField
                id="passwordLabel"
                label="Пароль"
                type="password"
                placeholder="Пароль"
                error={Boolean(errors.password?.message)}
                {...register("password")}
              />
            </div>
            <div className={styles.login__formButtons}>
              <Button
                title="Зарегестрироваться"
                variant="secondary"
                type="button"
                size="main"
                onClick={handleRegistration}
                isDisable={false}
                isLoading={false}
              />
              <Button
                title="Войти"
                variant="primary"
                type="submit"
                size="main"
                isDisable={emptyValue ? true : false}
                isLoading={loginFormSubmit.isPending}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginComponent;
