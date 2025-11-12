import { supabase } from "@shared/api/supabase/supabaseClient";
import type { User } from "@supabase/supabase-js";

export async function getJobsFiltersDB(user: User) {
  try {
    const { error, data } = await supabase
      .from("jobs_filters")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error && !data)
      throw new Error("Error: jobs_filters table get failed. Please try again");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
