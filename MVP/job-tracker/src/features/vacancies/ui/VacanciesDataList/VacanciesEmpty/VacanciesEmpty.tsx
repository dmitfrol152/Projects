import { useTranslation } from "react-i18next";

export function VacanciesEmpty() {
  const { t } = useTranslation("hh");

  return (
    <div className="flex flex-col gap-3 items-center">
      <p>{t("hhEmpty")}</p>
    </div>
  );
}
