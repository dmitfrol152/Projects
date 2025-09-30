import { Form } from "@/components/Form";
import {
  RegistrationFormResolverSchema,
  type RegistrationFormResolverProps,
} from "@/components/Form/types";
import { ButtonUi } from "@/ui/ButtonUi";
import { InputUi } from "@/ui/InputUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useContext";
import { RegistrationLayout } from "@/components/RegistrationLayout";
import { RegistrationTitle } from "@/components/RegistrationLayout/RegistrationTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IconGitHub from "@assets/svg/icon-github.svg?react";
import IconGoogleMail from "@assets/svg/icon-google-mail.svg?react";
import { supabase } from "@/api/AppSupabaseClient";

export default function Registration() {
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
      error={isErrorText}
      title={<RegistrationTitle />}
      form={
        <Form
          onSubmit={handleSubmit(handleCustomSubmit)}
          buttons={
            <>
              <ButtonUi size="md" variant="primary" type="submit">
                Registration
              </ButtonUi>
              <ButtonUi
                size="md"
                variant="secondary"
                type="button"
                handleClickButton={handleGoToLogin}
              >
                Login
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
          <InputUi
            label="Confirm password"
            type="text"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </Form>
      }
    />
  );
}
