import { useTranslation } from "react-i18next";

export function VacanciesParagraph() {
  const { t } = useTranslation("hh");

  return <p className="text-[var(--color-gray-600)]">{t("hhDescription")}</p>;
}
