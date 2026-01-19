import { useTranslation } from "react-i18next";

export function SettingsParagraph() {
  const { t } = useTranslation("settings");

  return (
    <p className="text-[var(--color-gray-600)]">{t("settingsDescription")}</p>
  );
}
