import { Form } from "@shared/ui/Form";
import {
  RegistrationFormResolverSchema,
  type RegistrationFormResolverProps,
} from "@shared/ui/Form/types";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { InputUi } from "@shared/ui/InputUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@shared/lib/context/contexts";
import { RegistrationLayout } from "@shared/ui/RegistrationLayout";
import { RegistrationTitle } from "@shared/ui/RegistrationLayout/RegistrationTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IconGitHub from "@shared/assets/svg/icon-github.svg?react";
import IconGoogleMail from "@shared/assets/svg/icon-google-mail.svg?react";
import { supabase } from "@shared/api/supabase/supabaseClient";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@/shared/lib/hooks/useWindowResize";

export default function Registration() {
  const { t } = useTranslation("registration");
  const { width } = useWindowResize();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({ resolver: zodResolver(RegistrationFormResolverSchema) });
  const { signUp } = useAuth();
  const navigation = useNavigate();
  const [isErrorText, setIsErrorText] = useState<string | null>(null);

  async function handleCustomSubmit({
    email,
    password,
    confirmPassword,
  }: RegistrationFormResolverProps) {
    if (password === confirmPassword) {
      try {
        const { error } = await signUp(email, password);

        if (error) {
          setIsErrorText(error.message);
          throw new Error("Error registration DataBase");
        }

        navigation("/login");
      } catch (err) {
        console.log(err);
      }
    }

    reset();
  }

  function handleGoToLogin() {
    navigation("/login");
  }

  async function handleOAuthGitHub() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        setIsErrorText(error.message);
        throw new Error("Error login DataBase");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleOAuthGoogleMail() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        setIsErrorText(error.message);
        throw new Error("Error login DataBase");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const isEmpty =
    watch("email") || watch("password") || watch("confirmPassword");

  useEffect(() => {
    if (isEmpty) {
      setIsErrorText(null);
    }
  }, [isEmpty]);

  return (
    <RegistrationLayout
      width={width}
      error={isErrorText}
      title={<RegistrationTitle />}
      form={
        <Form
          onSubmit={handleSubmit(handleCustomSubmit)}
          buttons={
            <>
              <ButtonUi size="md" variant="primary" type="submit">
                {t("registrationRegistrationButton")}
              </ButtonUi>
              <ButtonUi
                size="md"
                variant="secondary"
                type="button"
                handleClickButton={handleGoToLogin}
              >
                {t("registrationLoginButton")}
              </ButtonUi>
            </>
          }
          buttonsSecondary={
            <>
              <ButtonUi
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                type="button"
                size="icon"
                variant="icon"
                handleClickButton={handleOAuthGitHub}
              >
                <IconGitHub className="w-6 h-6" />
              </ButtonUi>
              <ButtonUi
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                type="button"
                size="icon"
                variant="icon"
                handleClickButton={handleOAuthGoogleMail}
              >
                <IconGoogleMail className="w-6 h-6" />
              </ButtonUi>
            </>
          }
        >
          <InputUi
            label={t("registrationEmailLabel")}
            type="text"
            placeholder={t("registrationEmailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />
          <InputUi
            label={t("registrationPasswordLabel")}
            type="password"
            placeholder={t("registrationPasswordPlaceholder")}
            error={errors.password?.message}
            {...register("password")}
          />
          <InputUi
            label={t("registrationConfirmPasswordLabel")}
            type="password"
            placeholder={t("registrationConfirmPasswordPlaceholder")}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </Form>
      }
    />
  );
}
