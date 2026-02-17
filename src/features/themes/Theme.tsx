import { Box, styled } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { useTranslation } from "react-i18next";

const ThemeWrapper = styled(Box)({
  height: "fit-content",
  maxHeight: "40px",
  aspectRatio: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export default function Theme() {
  const { currentTheme, changeTheme } = useContext(ThemeContext);
  const { t } = useTranslation("a11y");

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      changeTheme();
    }
  };

  return (
    <ThemeWrapper
      onClick={changeTheme}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={t("theme")}
    >
      {currentTheme === "light" ? (
        <DarkModeIcon fontSize="medium" color="inherit" />
      ) : (
        <LightModeIcon fontSize="medium" color="inherit" />
      )}
    </ThemeWrapper>
  );
}
