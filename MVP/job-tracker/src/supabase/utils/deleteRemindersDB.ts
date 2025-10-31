import { supabase } from "@/api/AppSupabaseClient";

export async function deleteRemindersDB(remindersId: string) {
  try {
    const { error } = await supabase
      .from("reminders")
      .delete()
      .eq("id", remindersId);

    if (error)
      throw new Error("Error: deleted reminders is filed. Please try again.");

    return new Response(JSON.stringify({ messsage: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
