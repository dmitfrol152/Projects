import { useProfileManager } from "@hooks/useProfileManager/useProfileManager";
import type { HandleDeleteProfileProps } from "./types";

export function useHandleDeleteProfile() {
  const { deleteProfile } = useProfileManager();

  async function handleDeleteProfileWrapper({
    user,
    setAvatarFile,
    setAvatarUrl,
    refreshProfile,
    openModal,
    closeModal,
    setModalAppeareName,
    setLoadingSave,
  }: HandleDeleteProfileProps) {
    if (!user?.id) return;

    setLoadingSave(true);
    setModalAppeareName(null);
    closeModal();
    try {
      const { error } = await deleteProfile(user.id);

      if (error) {
        throw new Error("Error delete profile");
      }

      setModalAppeareName("successDeleteProfile");
      openModal();
      setLoadingSave(false);
      setAvatarFile(null);
      setAvatarUrl(null);
      refreshProfile();
    } catch (error) {
      setModalAppeareName("errorDeleteProfile");
      openModal();
      setLoadingSave(false);
      console.error(error);
    }
  }
  return handleDeleteProfileWrapper;
}
