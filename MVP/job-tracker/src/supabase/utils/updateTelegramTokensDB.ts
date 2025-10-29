import { supabase } from "@/api/AppSupabaseClient";
import type { User } from "@supabase/supabase-js";

export async function updateTelegramTokensDB(code: string, user: User) {
  try {
    const { error, data } = await supabase.from("telegram_tokens").upsert({
      token: code,
      user_id: user.id,
    });

    if (error && !data)
      throw new Error(
        "Error: telegram_tokens table update failed. Please try again"
      );

    return code;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
