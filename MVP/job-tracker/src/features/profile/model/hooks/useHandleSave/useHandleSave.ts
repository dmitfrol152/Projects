import { useProfileManager } from "@features/profile/model/useProfileManager";
import type { HandleSaveProps } from "./types";

export function useHandleSave() {
  const { uploadAvatar, editProfile, deleteAvatar } = useProfileManager();

  async function handleSaveWrapper({
    user,
    avatarFile,
    avatarUrl,
    memoryUrl,
    setMemoryUrl,
    fullName,
    refreshProfile,
    openModal,
    setModalAppeareName,
    setLoadingSave,
  }: HandleSaveProps) {
    if (!user) return;

    try {
      let loadedAvatarDB = null;
      setLoadingSave(true);

      if (avatarFile) {
        loadedAvatarDB = await uploadAvatar(user.id, avatarFile);

        if (!loadedAvatarDB) {
          setModalAppeareName("errorEdit");
          setLoadingSave(false);
          openModal();
          return;
        }
      }

      if (!avatarFile && !avatarUrl && memoryUrl) {
        await deleteAvatar(memoryUrl);
        setMemoryUrl(null);
      }

      const { error } = await editProfile({
        id: user.id,
        full_name: fullName,
        avatar_url: loadedAvatarDB || avatarUrl || "",
      });

      if (error) {
        setModalAppeareName("errorEdit");
        openModal();
        throw new Error("Error edit profile");
      }
      setModalAppeareName("successEdit");
      setLoadingSave(false);
      openModal();
      refreshProfile();
    } catch (error) {
      console.error(error);
      setModalAppeareName("errorEdit");
      setLoadingSave(false);
      openModal();
    }
  }
  return handleSaveWrapper;
}
