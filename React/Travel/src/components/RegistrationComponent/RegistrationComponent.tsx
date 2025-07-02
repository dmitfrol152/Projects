import styles from "./RegistrationComponent.module.scss";
import FormField from "../FormField/FormField";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormSchema } from "./types";
import { useMutation } from "@tanstack/react-query";
import { registrationUser } from "../../api/User/User";
import { useEffect, useState } from "react";
import { queryClient } from "../../api/queryClient";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";

export const RegistrationComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(RegistrationFormSchema) });
  const [error, setError] = useState<string | null>(null);
  const [, setSearchParams] = useSearchParams();

  const registrationFormSubmit = useMutation({
    mutationFn: registrationUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      setSearchParams({});
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
              className={styles.registration__form}
              onSubmit={handleSubmit(({ email, password }) => {
                registrationFormSubmit.mutate({ email, password });
              })}
            >
              <div className={styles.registration__formWrapper}>
                <h3 className={styles.registration__formTitle}>Регистрация</h3>
                {error !== null ? (
                  <span className={styles.registration__formError}>
                    {error}
                  </span>
                ) : null}
                <div className={styles.registration__formInputs}>
                  <FormField
                    id="username"
                    label="Логин"
                    type="text"
                    placeholder="Email"
                    error={Boolean(errors.email?.message)}
                    errors={errors.email?.message}
                    {...register("email")}
                  />
                  <div className={styles.registration__formInputsPassword}>
                    <FormField
                      id="password"
                      label="Пароль"
                      type="password"
                      placeholder="Пароль"
                      error={Boolean(errors.password?.message)}
                      errors={errors.password?.message}
                      {...register("password")}
                    />
                    <FormField
                      id="confirmPassword"
                      label="Повторить пароль"
                      type="password"
                      placeholder="Повторить пароль"
                      error={Boolean(errors.confirmPassword?.message)}
                      errors={errors.confirmPassword?.message}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RegistrationComponent;
