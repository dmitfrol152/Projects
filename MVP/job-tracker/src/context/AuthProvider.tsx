import { useCallback, useEffect, useMemo, useState } from "react";
import type { AuthProviderProps, ProfileProps } from "./types";
import { supabase } from "@/api/AppSupabaseClient";
import type { AuthSession, Session, User } from "@supabase/supabase-js";
import { AuthContext } from "@/hooks/useContext";
import { useProfileManager } from "@/hooks/useProfileManager/useProfileManager";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const { getProfile } = useProfileManager();

  const getInitialProfile = useCallback(
    async (session: AuthSession) => {
      const id = session.user.id;
      const profileFetching = await getProfile(id);
      setProfile(profileFetching);
      setLoadingProfile(false);
    },
    [getProfile]
  );

  function setFunctionsIsActivate(session: AuthSession | null) {
    setSession(session ?? null);
    setUser(session?.user ?? null);
    setLoading(false);
  }

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setFunctionsIsActivate(session);

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setFunctionsIsActivate(session);
        }
      );

      return () => {
        listener?.subscription.unsubscribe?.();
      };
    };

    init();
  }, []);

  useEffect(() => {
    const initialProfile = async () => {
      if (session?.user) {
        await getInitialProfile(session);
      }
    };

    initialProfile();
  }, [getInitialProfile, session]);

  const refreshProfile = useCallback(async () => {
    if (session?.user) {
      await getInitialProfile(session);
    }
  }, [getInitialProfile, session]);

  const signUp = (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  };

  const signIn = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const memoValues = useMemo(
    () => ({
      user,
      session,
      signIn,
      signOut,
      signUp,
      loading,
      profile,
      loadingProfile,
      refreshProfile,
    }),
    [user, session, loading, profile, loadingProfile, refreshProfile]
  );

  return (
    <AuthContext.Provider value={memoValues}>{children}</AuthContext.Provider>
  );
}
