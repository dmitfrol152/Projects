import type { ReactNode } from "react";
import z from "zod";
import { i18nInstance as i18n } from "@shared/i18n";

const validation = {
  incorrectEmail: i18n.t("common:validationIncorrectEmail"),
  min5: i18n.t("common:validationMin5"),
  min8: i18n.t("common:validationMin8"),
  min3: i18n.t("common:validationMin3"),
  passwordsMismatch: i18n.t("common:validationPasswordsMismatch"),
  chooseOption: i18n.t("common:validationChooseOption"),
  emptyField: i18n.t("common:validationEmptyField"),
  dateNotPast: i18n.t("common:validationDateNotPast"),
};

export const FormSchema = z.object({
  children: z.custom<ReactNode>(),
  onSubmit: z.function(),
  className: z.string().optional(),
  buttons: z.custom<ReactNode>(),
  buttonsSecondary: z.custom<ReactNode>().optional(),
  error: z.string().optional(),
});

export type FormProps = z.infer<typeof FormSchema>;

export const LoginFormResolverSchema = z.object({
  email: z.email(validation.incorrectEmail).min(5, validation.min5),
  password: z.string().min(8, validation.min8),
});

export type LoginFormResolverProps = z.infer<typeof LoginFormResolverSchema>;

export const RegistrationFormResolverSchema = z
  .object({
    email: z.email(validation.incorrectEmail).min(5, validation.min5),
    password: z.string().min(8, validation.min8),
    confirmPassword: z.string().min(8, validation.min8),
  })
  .refine((checkField) => checkField.password === checkField.confirmPassword, {
    message: validation.passwordsMismatch,
    path: ["confirmPassword"],
  });

export type RegistrationFormResolverProps = z.infer<
  typeof RegistrationFormResolverSchema
>;

export const DashboardFormResolverSchema = z
  .object({
    position: z.string().min(3, validation.min3),
    company: z.string().min(3, validation.min3),
    status: z.enum([
      "",
      "applied",
      "interview",
      "offer",
      "rejected",
      "washlist",
    ]),
    notes: z.string().nullable(),
    id: z.string().optional(),
    url: z.string().optional(),
  })
  .refine((checkFieldSelect) => checkFieldSelect.status !== "", {
    message: validation.chooseOption,
    path: ["status"],
  });

export type DashboardFormResolverProps = z.infer<
  typeof DashboardFormResolverSchema
>;

export const NotificationFormResolverSchema = z
  .object({
    message: z.string().min(3, validation.min3),
    date: z.string().nonempty(validation.emptyField),
  })
  .refine((date) => new Date(date.date) >= new Date(), {
    message: validation.dateNotPast,
    path: ["date"],
  });

export type NotificationFormResolverProps = z.infer<
  typeof NotificationFormResolverSchema
>;

export const VacanciesFormResolverSchema = z.object({
  salary: z.string().nullable().optional(),
  experience: z.string().optional(),
  orderBy: z.string().optional(),
  city: z.string().optional(),
});

export type VacanciesFormResolverProps = z.infer<
  typeof VacanciesFormResolverSchema
>;
