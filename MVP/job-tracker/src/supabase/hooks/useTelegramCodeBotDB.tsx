import { getUniqueId } from "@/utils/getUniqueId";
import { useState, useEffect } from "react";
import { updateTelegramTokensDB } from "../utils/updateTelegramTokensDB";
import type { User } from "@supabase/supabase-js";
import { deleteTelegramTokensDB } from "../utils/deleteTelegramTokensDB";

export function useTelegramCodeBotDB(
  user: User | null,
  getKayStatus: boolean,
  setGetKeyStatus: (value: boolean) => void
) {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!getKayStatus) return;

    async function generateToken() {
      const newCode = getUniqueId();

      if (!user) return;

      setLoading(true);
      await deleteTelegramTokensDB(user);
      const code = await updateTelegramTokensDB(newCode, user);
      setLoading(false);
      if (!code) return;

      setCode(code);
      setGetKeyStatus(false);
    }

    generateToken();
  }, [getKayStatus, user, setGetKeyStatus]);

  function clearCode() {
    setCode(null);
  }

  return { code, clearCode, loading };
}
