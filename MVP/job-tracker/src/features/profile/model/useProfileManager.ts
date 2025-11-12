import { useDeleteAvatar } from "@/entities/profile/api/useDeleteAvatar";
import { useDeleteProfile } from "@/entities/profile/api/useDeleteProfile";
import { useEditProfile } from "@/entities/profile/api/useEditProfile";
import { useGetProfile } from "@/entities/profile/api/useGetProfile";
import { useUploadAvatar } from "@/entities/profile/api/useUploadAvatar";

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
