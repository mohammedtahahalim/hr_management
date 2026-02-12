import { createTheme, type Theme } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { darkPalette, lightPalette } from "../../config/muiSettings";

export type TTheme = "light" | "dark";

interface UseThemeProps {
  cooldown: number;
}

interface UseThemeReturns {
  currentTheme: TTheme;
  changeTheme: () => void;
  HRTheme: Theme;
}

const fetchInitialTheme = (): TTheme => {
  try {
    const localTheme = localStorage.getItem("theme");
    if (localTheme && ["light", "dark"].includes(localTheme))
      return localTheme as TTheme;
    const media = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (media) return "dark";
    return "light";
  } catch (err) {
    console.log(err);
    return "light";
  }
};

export default function useTheme(props?: UseThemeProps): UseThemeReturns {
  const { cooldown } = props || { cooldown: 250 };
  const [currentTheme, setCurrentTheme] = useState<TTheme>(fetchInitialTheme);
  const isRunning = useRef<boolean>(false);

  const changeTheme = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    setCurrentTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
    setTimeout(() => {
      isRunning.current = false;
    }, cooldown);
  }, [cooldown]);

  useEffect(() => {
    try {
      localStorage.setItem("theme", currentTheme);
    } catch (err) {
      console.warn(err);
    }
  }, [currentTheme]);

  const HRTheme: Theme = useMemo(
    () =>
      createTheme({
        breakpoints: {},
        palette: {
          mode: currentTheme,
          ...(currentTheme === "light" ? lightPalette : darkPalette),
        },
      }),
    [currentTheme],
  );

  return { currentTheme, changeTheme, HRTheme };
}
