import { useTranslation } from "react-i18next";

export function DashboardParagraph() {
  const { t } = useTranslation("dashboard");

  return (
    <p className="text-[var(--color-gray-600)]">{t("dashboardDescription")}</p>
  );
}
