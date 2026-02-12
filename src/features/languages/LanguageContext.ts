import { createContext } from "react";
import type { TLanguage } from "../../config/i18n";

interface LanguageContextProps {
  changeLanguage: (lng: TLanguage) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  changeLanguage: (_lng: TLanguage) => {},
});
