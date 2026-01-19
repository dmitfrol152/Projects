import { useTranslation } from "react-i18next";

export function StatsTitle() {
  const { t } = useTranslation("statistics");

  return <h1 className="text-3xl font-bold">{t("statisticsTitle")}</h1>;
}
