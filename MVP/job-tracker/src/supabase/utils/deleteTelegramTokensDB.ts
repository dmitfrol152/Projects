import { supabase } from "@/api/AppSupabaseClient";
import type { User } from "@supabase/supabase-js";

export async function deleteTelegramTokensDB(user: User) {
  try {
    const { error } = await supabase
      .from("telegram_tokens")
      .delete()
      .eq("user_id", user.id);

    if (error)
      throw new Error(
        "Error: telegram_tokens table deleted failed. Please try again"
      );

    return { status: "success" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
