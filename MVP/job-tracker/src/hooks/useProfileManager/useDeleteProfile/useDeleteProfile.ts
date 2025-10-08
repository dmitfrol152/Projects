import { supabase } from "@/api/AppSupabaseClient";

export function useDeleteProfile() {
  async function deleteProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) throw new Error("Error delete profile");

      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  }

  return deleteProfile;
}
