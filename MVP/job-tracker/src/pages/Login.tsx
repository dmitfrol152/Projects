import { LoginLayout } from "@/components/LoginLayout";
import { Form } from "@/components/Form";
import {
  LoginFormResolverSchema,
  type LoginFormResolverProps,
} from "@/components/Form/types";
import { LoginTitle } from "@/components/LoginLayout/LoginTitle";
import { ButtonUi } from "@/ui/ButtonUi";
import { InputUi } from "@/ui/InputUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IconGitHub from "@assets/svg/icon-github.svg?react";
import IconGoogleMail from "@assets/svg/icon-google-mail.svg?react";
import { supabase } from "@/api/AppSupabaseClient";

export default function Login() {
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

  const isEmpty = watch("email") || watch("password");

  useEffect(() => {
    if (isEmpty) {
      setIsErrorText(null);
    }
  }, [isEmpty]);

  return (
    <LoginLayout
      error={isErrorText}
      title={<LoginTitle />}
      form={
        <Form
          onSubmit={handleSubmit(handleCustomSubmit)}
          buttons={
            <>
              <ButtonUi size="md" variant="primary" type="submit">
                Login
              </ButtonUi>
              <ButtonUi
                size="md"
                variant="secondary"
                type="button"
                handleClickButton={handleGoToRegistration}
              >
                Registration
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
            label="Email"
            type="text"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />
          <InputUi
            label="Password"
            type="text"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />
        </Form>
      }
    />
  );
}
