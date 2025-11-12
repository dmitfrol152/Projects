import { supabase } from "@shared/api/supabase/supabaseClient";

export async function getTelegramUserIdDB(userId: string) {
  try {
    const { error, data } = await supabase
      .from("telegram_users")
      .select("chat_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error)
      throw new Error(
        "Error: no user with this ID was found. Please try again."
      );

    return data?.chat_id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
