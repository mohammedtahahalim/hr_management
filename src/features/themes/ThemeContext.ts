import { createContext } from "react";
import type { TTheme } from "./useTheme";

interface ThemeContextProps {
  currentTheme: TTheme;
  changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: "light",
  changeTheme: () => {},
});
