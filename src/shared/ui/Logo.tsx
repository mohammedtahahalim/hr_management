import { Box, styled } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../features/themes/ThemeContext";
import { useTranslation } from "react-i18next";

const LogoWrapper = styled(Box)({
  width: "100%",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

export default function Logo() {
  const { currentTheme } = useContext(ThemeContext);
  const { t } = useTranslation("a11y");
  return (
    <LogoWrapper>
      <Image
        src={
          currentTheme === "light"
            ? "/img/logo_light.webp"
            : "/img/logo_dark.webp"
        }
        alt={t("logo_label")}
      />
    </LogoWrapper>
  );
}
