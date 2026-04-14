import { useEffect } from "react";
import type { TLanguage } from "../../config/i18n";
import { LanguageContext } from "./LanguageContext";
import { useTranslation } from "react-i18next";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n, t } = useTranslation("common");
  const changeLanguage = (lng: TLanguage) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    document.title = t("title");
    if (i18n.language === "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [i18n.language, t]);

  return (
    <LanguageContext.Provider value={{ changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
