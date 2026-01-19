import { useTranslation } from "react-i18next";

export function SettingsTitle() {
  const { t } = useTranslation("settings");

  return <h1 className="text-3xl font-bold">{t("settingsTitle")}</h1>;
}
