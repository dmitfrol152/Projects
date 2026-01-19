import { useTranslation } from "react-i18next";

export function DashboardTitle() {
  const { t } = useTranslation("dashboard");

  return <h1 className="text-3xl font-bold">{t("dashboardTitle")}</h1>;
}
