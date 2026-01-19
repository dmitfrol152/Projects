import { useTranslation } from "react-i18next";

export function VacanciesTitle() {
  const { t } = useTranslation("hh");

  return <h1 className="text-3xl font-bold">{t("hhTitle")}</h1>;
}
