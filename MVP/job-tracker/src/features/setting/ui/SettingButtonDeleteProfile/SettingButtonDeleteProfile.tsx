import { ButtonUi } from "@shared/ui/ButtonUi";
import type { SettingButtonDeleteProfileProps } from "./types";
import { useTranslation } from "react-i18next";

export function SettingButtonDeleteProfile({
  handleConfirmDeleteProfile,
}: SettingButtonDeleteProfileProps) {
  const { t } = useTranslation("settings");

  return (
    <ButtonUi
      type="button"
      size="md"
      variant="exit"
      handleClickButton={handleConfirmDeleteProfile}
    >
      {t("settingsButtonDeleteProfile")}
    </ButtonUi>
  );
}
