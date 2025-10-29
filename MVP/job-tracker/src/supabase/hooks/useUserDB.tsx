import { useState, useEffect } from "react";
import { getUserDB } from "../utils/getUserDB";
import type { User } from "@supabase/supabase-js";

export function useUserDB() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function generateUser() {
      const user = await getUserDB();
      if (!user) return;

      setUser(user);
    }

    generateUser();
  }, []);

  return { user };
}
