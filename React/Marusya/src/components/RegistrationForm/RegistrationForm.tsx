import { FC } from "react";
import { FormField } from "../FormField/FormField";
import { Button } from "../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { registrationUser } from "../../api/User/User";
import IconEmail from "../../assets/images/icon-email.svg?react";
import IconKey from "../../assets/images/icon-key.svg?react";
import IconUser from "../../assets/images/icon-user.svg?react";
import styles from "./RegistrationForm.module.scss";
import { useDispatch } from "react-redux";
import { errorRegType, successAuthType } from "../../store/authTypeSlice";
import {
  emailValue,
  nameValue,
  surnameValue,
  passwordValue,
  confirmPasswordValue,
} from "../../store/registrationFormSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps, FormSchema } from "./type";

export const RegistrationForm: FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(FormSchema),
  });

  const emailFieldValue = watch("email");
  const nameFieldValue = watch("name");
  const surnameFieldValue = watch("surname");
  const passwordFieldValue = watch("password");
  const confirmPasswordFieldValue = watch("confirmPassword");

  const emptyValue =
    !emailFieldValue ||
    !nameFieldValue ||
    !surnameFieldValue ||
    !passwordFieldValue ||
    !confirmPasswordFieldValue;

  const registrationFormMutation = useMutation({
    mutationFn: registrationUser,
    onSuccess: () => {
      dispatch(successAuthType());
    },
    onError: () => {
      dispatch(errorRegType());
      setTimeout(() => {
        dispatch(emailValue({ email: "" }));
        dispatch(nameValue({ name: "" }));
        dispatch(surnameValue({ surname: "" }));
        dispatch(passwordValue({ password: "" }));
        dispatch(confirmPasswordValue({ confirmPassword: "" }));
      }, 300);
    },
  });

  return (
    <form
      className={styles.registrationForm}
      onSubmit={handleSubmit(({ email, password, name, surname }) => {
        registrationFormMutation.mutate({ email, password, name, surname });
      })}
    >
      <h2 className={styles.registrationForm__title}>Регистрация</h2>
      <div className={styles.registrationForm__wrapper}>
        <FormField
          label="Введите email"
          type="text"
          {...register("email")}
          placeholder="Электронная почта"
          icon={<IconEmail />}
          error={errors.email?.message}
        />
        <FormField
          label="Введите имя"
          type="text"
          {...register("name")}
          placeholder="Имя"
          icon={<IconUser />}
          error={errors.name?.message}
        />
        <FormField
          label="Введите фамилию"
          type="text"
          {...register("surname")}
          placeholder="Фамилия"
          icon={<IconUser />}
          error={errors.surname?.message}
        />
        <FormField
          label="Введите пароль"
          type="password"
          {...register("password")}
          placeholder="Пароль"
          icon={<IconKey />}
          error={errors.password?.message}
        />
        <FormField
          label="Введите повторно пароль"
          type="password"
          {...register("confirmPassword")}
          placeholder="Подтвердите пароль"
          icon={<IconKey />}
          error={errors.confirmPassword?.message}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        title="Создать аккаунт"
        size="medium"
        isLoading={registrationFormMutation.isPending}
        isDisabled={emptyValue}
      />
    </form>
  );
};

export default RegistrationForm;
