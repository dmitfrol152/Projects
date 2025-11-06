import { supabase } from "@/api/AppSupabaseClient";

export async function updateJobsFiltersDB(
  userId: string,
  query: string,
  salary: number | null,
  experience: string,
  orderBy: string,
  city: string
) {
  try {
    const { error, data } = await supabase.from("jobs_filters").upsert(
      {
        user_id: userId,
        query,
        salary,
        experience,
        orderby: orderBy,
        city,
      },
      { onConflict: "user_id" }
    );

    if (error && !data)
      throw new Error(
        "Error: jobs_filters table update failed. Please try again"
      );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
