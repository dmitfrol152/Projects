import { supabase } from "@shared/api/supabase/supabaseClient";

export function useDeleteAvatar() {
  async function deleteAvatar(pathForAvatar: string) {
    const modifePath = pathForAvatar.split("/avatars/")[1];
    try {
      const { error } = await supabase.storage
        .from("avatars")
        .remove([modifePath]);

      if (error) throw new Error("Error delete avatar");

      return console.log("Success delete avatar");
    } catch (error) {
      console.error(error);
    }
  }

  return deleteAvatar;
}
