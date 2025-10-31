import { supabase } from "@/api/AppSupabaseClient";
import type { NotificationFormResolverProps } from "@/components/Form/types";
import type { User } from "@supabase/supabase-js";

export async function addRemindersDB(
  newReminder: NotificationFormResolverProps,
  user: User | null,
  userTelegramId: string | null
) {
  try {
    const { error } = await supabase.from("reminders").insert([
      {
        user_id: user?.id,
        note: newReminder.message,
        time: new Date(newReminder.date).toISOString(),
        telegram_id: userTelegramId,
      },
    ]);

    if (error)
      throw new Error("Error: add reminders is filed. Please try again.");

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
