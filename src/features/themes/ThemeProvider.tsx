import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import useTheme from "./useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { currentTheme, changeTheme, HRTheme } = useTheme();
  return (
    <MuiThemeProvider theme={HRTheme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
