import type { TLanguage } from "../../config/i18n";
import i18n from "../../config/i18n";
import { LanguageContext } from "./LanguageContext";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const changeLanguage = (lng: TLanguage) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
