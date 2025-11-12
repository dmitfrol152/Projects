import { supabase } from "@shared/api/supabase/supabaseClient";
import type { ProfileProps } from "@features/profile/model/types";

export function useEditProfile() {
  async function editProfile(profile: ProfileProps) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(profile, { onConflict: "id" })
        .select()
        .single();

      if (error) throw new Error("Error edit profile");

      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  }

  return editProfile;
}
