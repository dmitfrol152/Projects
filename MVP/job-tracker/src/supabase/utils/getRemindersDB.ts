import { supabase } from "@/api/AppSupabaseClient";
import type { User } from "@supabase/supabase-js";

export async function getRemindersDB(user: User | null) {
  try {
    const { error, data } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", user?.id)
      .order("time", { ascending: true });

    if (error)
      throw new Error("Error: fetch reminders is filed. Please try again.");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
