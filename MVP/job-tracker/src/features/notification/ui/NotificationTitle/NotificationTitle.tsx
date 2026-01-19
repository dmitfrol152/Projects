import { useTranslation } from "react-i18next";

export function NotificationTitle() {
  const { t } = useTranslation("reminders");

  return <h1 className="text-3xl font-bold">{t("remindersTitle")}</h1>;
}
