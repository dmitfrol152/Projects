import { InputUi } from "@shared/ui/InputUi";
import type { SettingInputFullNameInfoProps } from "./types";
import { useTranslation } from "react-i18next";

export function SettingInputFullNameInfo({
  fullName,
  setFullName,
}: SettingInputFullNameInfoProps) {
  const { t } = useTranslation("settings");

  return (
    <InputUi
      label={t("settingsLabelName")}
      placeholder={fullName ? fullName : t("settingsNameEmpty")}
      type="text"
      value={fullName}
      setValue={setFullName}
    />
  );
}
