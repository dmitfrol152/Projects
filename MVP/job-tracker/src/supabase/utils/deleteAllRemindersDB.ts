import { supabase } from "@/api/AppSupabaseClient";
import type { User } from "@supabase/supabase-js";

export async function deleteAllRemindersDB(user: User | null) {
  try {
    const { error } = await supabase
      .from("reminders")
      .delete()
      .eq("user_id", user?.id);

    if (error)
      throw new Error(
        "Error: deleted all reminders is filed. Please try again."
      );

    return new Response(JSON.stringify({ messsage: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ messsage: "error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
