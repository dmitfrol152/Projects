import type { ReactNode } from "react";
import z from "zod";

export const FormSchema = z.object({
  children: z.custom<ReactNode>(),
  onSubmit: z.function(),
  className: z.string().optional(),
  buttons: z.custom<ReactNode>(),
  buttonsSecondary: z.custom<ReactNode>().optional(),
  error: z.boolean().optional(),
});

export type FormProps = z.infer<typeof FormSchema>;

export const LoginFormResolverSchema = z.object({
  email: z.email("Incorrect email").min(5, "Enter at least 5 characters"),
  password: z.string().min(8, "Please enter at least 8 characters"),
});

export type LoginFormResolverProps = z.infer<typeof LoginFormResolverSchema>;

export const RegistrationFormResolverSchema = z
  .object({
    email: z.email("Incorrect email").min(5, "Enter at least 5 characters"),
    password: z.string().min(8, "Please enter at least 8 characters"),
    confirmPassword: z.string().min(8, "Please enter at least 8 characters"),
  })
  .refine((checkField) => checkField.password === checkField.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationFormResolverProps = z.infer<
  typeof RegistrationFormResolverSchema
>;

export const DashboardFormResolverSchema = z
  .object({
    position: z.string().min(3, "Enter at least 3 characters"),
    company: z.string().min(3, "Enter at least 3 characters"),
    status: z.enum([
      "",
      "applied",
      "interview",
      "offer",
      "rejected",
      "washlist",
    ]),
    notes: z.string().nullable(),
  })
  .refine((checkFieldSelect) => checkFieldSelect.status !== "", {
    message: "Choose one of the options",
    path: ["status"],
  });

export type DashboardFormResolverProps = z.infer<
  typeof DashboardFormResolverSchema
>;

export const NotificationFormResolverSchema = z
  .object({
    message: z.string().min(3, "Enter at least 3 characters"),
    date: z.string().nonempty("Dont empty field"),
  })
  .refine((date) => new Date(date.date) >= new Date(), {
    message: "The reminder date must not be less than the current date",
    path: ["date"],
  });

export type NotificationFormResolverProps = z.infer<
  typeof NotificationFormResolverSchema
>;
