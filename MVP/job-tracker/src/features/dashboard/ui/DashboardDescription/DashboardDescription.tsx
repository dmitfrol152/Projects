import { useTranslation } from "react-i18next";

export function DashboardDescription() {
  const { t } = useTranslation("dashboard");

  return (
    <p className="m-0 p-0 text-[var(--color-gray-600)]">{t("dashboardText")}</p>
  );
}
