import { useTranslation } from "react-i18next";

export function StatsParagraph() {
  const { t } = useTranslation("statistics");

  return (
    <p className="text-[var(--color-gray-600)]">{t("statisticsDescription")}</p>
  );
}
