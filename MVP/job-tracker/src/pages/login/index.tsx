import { LoginLayout } from "@shared/ui/LoginLayout";
import { Form } from "@shared/ui/Form";
import {
  LoginFormResolverSchema,
  type LoginFormResolverProps,
} from "@shared/ui/Form/types";
import { LoginTitle } from "@shared/ui/LoginLayout/LoginTitle";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { InputUi } from "@shared/ui/InputUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@shared/lib/context/contexts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IconGitHub from "@shared/assets/svg/icon-github.svg?react";
import IconGoogleMail from "@shared/assets/svg/icon-google-mail.svg?react";
import { supabase } from "@shared/api/supabase/supabaseClient";
import { useTranslation } from "react-i18next";
import { useWindowResize } from "@/shared/lib/hooks/useWindowResize";

export default function Login() {
  const { t } = useTranslation("login");
  const { width } = useWindowResize();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({ resolver: zodResolver(LoginFormResolverSchema) });
  const { signIn } = useAuth();
  const navigation = useNavigate();
  const [isErrorText, setIsErrorText] = useState<string | null>(null);

  const redirectUrl = import.meta.env.VITE_URL_APP || window.location.origin;

  async function handleCustomSubmit({
    email,
    password,
  }: LoginFormResolverProps) {
    try {
      const { error } = await signIn(email, password);

      if (error) {
        setIsErrorText(error.message);
        throw new Error("Error login DataBase");
      }

      navigation("/");
    } catch (err) {
      console.log(err);
    }

    reset();
  }

  function handleGoToRegistration() {
    navigation("/registration");
  }

  async function handleOAuthGitHub() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${redirectUrl}`,
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
          redirectTo: `${redirectUrl}`,
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

  const isEmpty = watch("email") || watch("password");

  useEffect(() => {
    if (isEmpty) {
      setIsErrorText(null);
    }
  }, [isEmpty]);

  return (
    <LoginLayout
      width={width}
      error={isErrorText}
      title={<LoginTitle />}
      form={
        <Form
          onSubmit={handleSubmit(handleCustomSubmit)}
          buttons={
            <>
              <ButtonUi size="md" variant="primary" type="submit">
                {t("loginLoginButton")}
              </ButtonUi>
              <ButtonUi
                size="md"
                variant="secondary"
                type="button"
                handleClickButton={handleGoToRegistration}
              >
                {t("loginRegistrationButton")}
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
            label={t("loginEmailLabel")}
            type="text"
            placeholder={t("loginEmailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />
          <InputUi
            label={t("loginPasswordLabel")}
            type="password"
            placeholder={t("loginPasswordPlaceholder")}
            error={errors.password?.message}
            {...register("password")}
          />
        </Form>
      }
    />
  );
}
