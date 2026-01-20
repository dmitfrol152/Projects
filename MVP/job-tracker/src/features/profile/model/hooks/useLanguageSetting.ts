import { useEffect, useState } from "react";
import i18n from "i18next";

export function useLanguageSetting() {
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    i18n.resolvedLanguage || "en",
  );

  const toggleLanguage = async () => {
    const newLang = currentLanguage === "en" ? "ru" : "en";

    await i18n.changeLanguage(newLang);

    setCurrentLanguage(newLang);
  };

  useEffect(() => {
    const handleChangeLang = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleChangeLang);

    return () => i18n.off("languageChanged", handleChangeLang);
  }, []);

  return { currentLanguage, toggleLanguage };
}
