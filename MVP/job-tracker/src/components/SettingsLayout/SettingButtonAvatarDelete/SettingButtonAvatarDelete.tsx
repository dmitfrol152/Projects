import type { SettingButtonAvatarDeleteProps } from "./types";
import IconDelete from "@assets/svg/icon-delete.svg?react";
import AvatarEmpty from "@assets/png/avatar-empty.png";
import { ButtonUi } from "@/ui/ButtonUi";

export function SettingButtonAvatarDelete({
  handleDeleteAvatar,
  avatarUrl,
}: SettingButtonAvatarDeleteProps) {
  return (
    <ButtonUi
      type="button"
      size="md"
      variant="exit"
      handleClickButton={handleDeleteAvatar}
      disabled={avatarUrl === AvatarEmpty || !avatarUrl}
    >
      <IconDelete className="w-5 h-5" />
    </ButtonUi>
  );
}
