import { InputUi } from "@shared/ui/InputUi";
import type { SettingInputAvatarInfoProps } from "./types";
import { useTranslation } from "react-i18next";

export function SettingInputAvatarInfo({
  handleAddAvatar,
}: SettingInputAvatarInfoProps) {
  const { t } = useTranslation("settings");

  const classNameLabel =
    "px-4 py-2 border rounded transition-colors border-[var(--color-black)] text-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)] focus:text-[var(--color-primary)] hover:text-[var(--color-primary)] focus:outline-none cursor-pointer";

  return (
    <InputUi
      classNameLabel={classNameLabel}
      className="hidden"
      label={t("settingsImageSelect")}
      type="file"
      accept="image/*"
      onChange={handleAddAvatar}
    />
  );
}
