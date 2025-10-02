import z from "zod";
import type { User, Session } from "@supabase/supabase-js";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export const AuthProviderSchema = z.object({
  children: z.custom<ReactNode>(),
});

export type AuthProviderProps = z.infer<typeof AuthProviderSchema>;

export const AuthContextSchema = z.object({
  user: z.custom<User>().nullable(),
  session: z.custom<Session>().nullable(),
  signUp: z.function({
    input: [z.string(), z.string()],
    output: z.any(),
  }),
  signIn: z.function({
    input: [z.string(), z.string()],
    output: z.any(),
  }),
  signOut: z.function({
    output: z.void(),
  }),
  loading: z.boolean(),
});

export type AuthContextProps = z.infer<typeof AuthContextSchema>;

export const SearchProviderSchema = z.object({
  children: z.custom<ReactNode>(),
});

export type SearchProviderProps = z.infer<typeof SearchProviderSchema>;

export const SearchContextSchema = z.object({
  isOpenSearch: z.boolean(),
  setIsOpenSearch: z.custom<Dispatch<SetStateAction<boolean>>>(),
  debounceValue: z.string(),
  query: z.string(),
  setQuery: z.function({
    input: [z.string()],
    output: z.void(),
  }),
});

export type SearchContextProps = z.infer<typeof SearchContextSchema>;
