import { supabase } from "@shared/api/supabase/supabaseClient";

export async function deletePassedRemindersDB() {
  const now = new Date().toISOString();
  try {
    const { error } = await supabase
      .from("reminders")
      .delete()
      .eq("send", true)
      .lte("time", now);

    if (error)
      throw new Error(
        "Error: deleted passed reminders is filed. Please try again."
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
