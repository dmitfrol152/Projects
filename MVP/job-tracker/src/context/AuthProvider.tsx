import { useEffect, useState } from "react";
import type { AuthProviderProps } from "./types";
import { supabase } from "@/api/AppSupabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import { AuthContext } from "@/hooks/useContext";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session ?? null);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        try {
          await supabase
            .from("profiles")
            .upsert([{ id: session.user.id, full_name: "", avatar_url: "" }], {
              onConflict: "id",
            });
        } catch (error) {
          console.error(error);
        }
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session ?? null);
          setUser(session?.user ?? null);

          if (session?.user) {
            try {
              await supabase
                .from("profiles")
                .upsert(
                  [{ id: session.user.id, full_name: "", avatar_url: "" }],
                  {
                    onConflict: "id",
                  }
                );
            } catch (error) {
              console.error(error);
            }
          }
        }
      );

      return () => {
        listener?.subscription.unsubscribe?.();
      };
    };

    init();
  }, []);

  const signUp = (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  };

  const signIn = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, signIn, signOut, signUp, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
