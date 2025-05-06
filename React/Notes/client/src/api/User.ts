import { z } from "zod";
import { validateResponse } from "./validateResponse";

// ** Typing

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// ** Registration

export function registerUser(
  username: string,
  email: string,
  password: string
): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).then(() => undefined);
}

// ** Login

export function loginUser(email: string, password: string): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

// ** UserMe

export function fetchMe(): Promise<User> {
  return fetch("/api/users/me")
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

// ** logout

export function loginUserCancel(): Promise<void> {
  return fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(validateResponse)
    .then(() => undefined);
}
