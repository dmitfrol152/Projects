import { useTranslation } from "react-i18next";

export function RegistrationTitle() {
  const { t } = useTranslation("registration");

  return <h1 className="text-2xl font-bold">{t("registrationTitle")}</h1>;
}
