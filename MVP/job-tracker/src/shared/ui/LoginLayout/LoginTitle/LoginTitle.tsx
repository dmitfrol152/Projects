import { useTranslation } from "react-i18next";

export function LoginTitle() {
  const { t } = useTranslation("login");

  return <h1 className="text-2xl font-bold">{t("loginTitle")}</h1>;
}
