import { useDeleteAvatar } from "./useDeleteAvatar/useDeleteAvatar";
import { useDeleteProfile } from "./useDeleteProfile/useDeleteProfile";
import { useEditProfile } from "./useEditProfile/useEditProfile";
import { useGetProfile } from "./useGetProfile/useGetProfile";
import { useUploadAvatar } from "./useUploadAvatar/useUploadAvatar";

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
