import { supabase } from "@/api/AppSupabaseClient";

export function useGetProfile() {
  async function getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw new Error("Error get profile");

      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  }

  return getProfile;
}
