import styles from "./RegistrationComponent.module.scss";
import FormField from "../FormField/FormField";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormSchema } from "./types";
import { useMutation } from "@tanstack/react-query";
import { registrationUser } from "../../api/User/User";
import { useDispatch } from "react-redux";
import { setPostsType } from "../../store/authTypeSlice";
import { useEffect, useState } from "react";

export const RegistrationComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(RegistrationFormSchema) });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const registrationFormSubmit = useMutation({
    mutationFn: registrationUser,
    onSuccess: () => {
      dispatch(setPostsType());
      setError(null);
    },
    onError: () => {
      setError("Пользователь с таким Email уже зарегестрирован!");
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const emptyValue = !emailValue || !passwordValue || !confirmPasswordValue;

  useEffect(() => {
    if (emptyValue !== null) {
      setError(null);
    }
  }, [emailValue, passwordValue, confirmPasswordValue]);

  return (
    <section className={styles.registration}>
      <div className="container">
        <form
          className={styles.registration__form}
          onSubmit={handleSubmit(({ email, password }) => {
            registrationFormSubmit.mutate({ email, password });
          })}
        >
          <div className={styles.registration__formWrapper}>
            <h3 className={styles.registration__formTitle}>Регистрация</h3>
            {errors.email ? (
              <span className={styles.registration__formError}>
                {errors.email?.message}
              </span>
            ) : errors.password ? (
              <span className={styles.registration__formError}>
                {errors.password?.message}
              </span>
            ) : errors.confirmPassword ? (
              <span className={styles.registration__formError}>
                {errors.confirmPassword?.message}
              </span>
            ) : null}
            {error !== null ? (
              <span className={styles.registration__formError}>{error}</span>
            ) : null}
            <div className={styles.registration__formInputs}>
              <FormField
                id="username"
                label="Логин"
                type="text"
                placeholder="Email"
                error={Boolean(error) || Boolean(errors.email?.message)}
                {...register("email")}
              />
              <div className={styles.registration__formInputsPassword}>
                <FormField
                  id="password"
                  label="Пароль"
                  type="password"
                  placeholder="Пароль"
                  error={Boolean(error) || Boolean(errors.password?.message)}
                  {...register("password")}
                />
                <FormField
                  id="confirmPassword"
                  label="Повторить пароль"
                  type="password"
                  placeholder="Повторить пароль"
                  error={
                    Boolean(error) || Boolean(errors.confirmPassword?.message)
                  }
                  {...register("confirmPassword")}
                />
              </div>
            </div>
            <div className={styles.registration__formButtons}>
              <Button
                title="Зарегестрироваться"
                variant="primary"
                type="submit"
                size="main"
                isDisable={emptyValue ? true : false}
                isLoading={registrationFormSubmit.isPending}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationComponent;
