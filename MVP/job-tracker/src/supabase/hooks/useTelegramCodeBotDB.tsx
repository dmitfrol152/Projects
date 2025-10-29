import { getUniqueId } from "@/utils/getUniqueId";
import { useState, useEffect } from "react";
import { updateTelegramTokensDB } from "../utils/updateTelegramTokensDB";
import type { User } from "@supabase/supabase-js";

export function useTelegramCodeBotDB(user: User | null) {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    async function generateToken() {
      const newCode = getUniqueId();

      if (!user) return;

      const code = await updateTelegramTokensDB(newCode, user);
      if (!code) return;

      setCode(code);
    }

    generateToken();
  }, [user]);

  return { code };
}
