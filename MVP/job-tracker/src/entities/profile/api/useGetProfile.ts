import { supabase } from "@shared/api/supabase/supabaseClient";
import { useCallback } from "react";

export function useGetProfile() {
  const getProfile = useCallback(async function getProfile(id: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw new Error("Error get profile");

      if (!data) {
        await supabase
          .from("profiles")
          .insert([{ id: id, full_name: "", avatar_url: "" }]);
        return null;
      } else if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  return getProfile;
}
