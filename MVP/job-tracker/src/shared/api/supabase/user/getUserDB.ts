import { supabase } from "@shared/api/supabase/supabaseClient";

export async function getUserDB() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Error: Please log in or register");

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
