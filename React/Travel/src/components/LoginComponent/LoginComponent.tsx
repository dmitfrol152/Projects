import styles from "./LoginComponent.module.scss";
import FormField from "../FormField/FormField";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./types";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/User/User";
import { queryClient } from "../../api/queryClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";

export const LoginComponent = () => {
  const [errorValue, setErrorValue] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: zodResolver(FormSchema) });
  const [, setSearchParams] = useSearchParams();

  const loginFormSubmit = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      setSearchParams({});
    },
    onError: () => {
      setErrorValue(true);
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const emptyValue = !emailValue || !passwordValue;

  useEffect(() => {
    if (errorValue) {
      setErrorValue(false);
    }
  }, [emailValue, passwordValue]);

  const handleRegistration = () => {
    setSearchParams({ auth: "registration" });
    return;
  };

  return (
    <section className={styles.login}>
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}
          >
            <form
              className={styles.login__form}
              onSubmit={handleSubmit(({ email, password }) => {
                loginFormSubmit.mutate({ email, password });
              })}
            >
              <div className={styles.login__formWrapper}>
                <h3 className={styles.login__formTitle}>Вход в профиль</h3>
                {errorValue ? (
                  <span className={styles.login__formError}>
                    Пользователь не найден!
                  </span>
                ) : null}
                <div className={styles.login__formInputs}>
                  <FormField
                    id="emailLabel"
                    label="Логин"
                    type="text"
                    placeholder="Email"
                    error={Boolean(errors.email?.message)}
                    errors={errors.email?.message}
                    {...register("email")}
                  />
                  <FormField
                    id="passwordLabel"
                    label="Пароль"
                    type="password"
                    placeholder="Пароль"
                    error={Boolean(errors.password?.message)}
                    errors={errors.password?.message}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoginComponent;
