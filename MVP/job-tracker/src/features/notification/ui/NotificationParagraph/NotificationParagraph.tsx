import { useTranslation } from "react-i18next";

export function NotificationParagraph() {
  const { t } = useTranslation("reminders");

  return (
    <p className="text-[var(--color-gray-600)]">{t("remindersDescription")}</p>
  );
}
