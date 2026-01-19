import { ButtonUi } from "@shared/ui/ButtonUi";
import type { SettingButtonSaveProps } from "./types";
import { useTranslation } from "react-i18next";

export function SettingButtonSave({ handleSave }: SettingButtonSaveProps) {
  const { t } = useTranslation("settings");

  return (
    <ButtonUi
      size="md"
      variant="primary"
      type="button"
      handleClickButton={handleSave}
    >
      {t("settingsButtonSave")}
    </ButtonUi>
  );
}
