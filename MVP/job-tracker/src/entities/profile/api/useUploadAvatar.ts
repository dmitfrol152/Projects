import { supabase } from "@/shared/api/supabase/supabaseClient";

export function useUploadAvatar() {
  async function uploadAvatar(userId: string, file: File) {
    const pathForAvatar = `${userId}/${Date.now()}`;

    try {
      const { error } = await supabase.storage
        .from("avatars")
        .upload(pathForAvatar, file, { upsert: true });

      if (error) throw new Error("Error upload avatar");

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(pathForAvatar);

      return data?.publicUrl ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return uploadAvatar;
}
