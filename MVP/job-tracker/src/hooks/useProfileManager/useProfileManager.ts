import { useDeleteAvatar } from "@hooks/useProfileManager/useDeleteAvatar/useDeleteAvatar";
import { useDeleteProfile } from "@hooks/useProfileManager/useDeleteProfile/useDeleteProfile";
import { useEditProfile } from "@hooks/useProfileManager/useEditProfile/useEditProfile";
import { useGetProfile } from "@hooks/useProfileManager/useGetProfile/useGetProfile";
import { useUploadAvatar } from "@hooks/useProfileManager/useUploadAvatar/useUploadAvatar";

export function useProfileManager() {
  const getProfile = useGetProfile();
  const editProfile = useEditProfile();
  const uploadAvatar = useUploadAvatar();
  const deleteAvatar = useDeleteAvatar();
  const deleteProfile = useDeleteProfile();

  return {
    getProfile,
    editProfile,
    uploadAvatar,
    deleteAvatar,
    deleteProfile,
  };
}
