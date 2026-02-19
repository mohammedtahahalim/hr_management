import { Box, styled, Typography } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../features/themes/ThemeContext";
import Theme from "../features/themes/Theme";
import Language from "../features/languages/Language";

const MaintenanceWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const MaintenanceContent = styled(Box)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",
  padding: "15px 30px",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.default,
}));

const ThemeWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  left: "10px",
});

const LanguageWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  right: "10px",
});

const LogoWrapper = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  overflow: "hidden",
});

const Logo = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const Content = styled(Box)({
  width: "100%",
  maxWidth: "650px",
  minHeight: "150px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
});

const Title = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const Message = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
});

export default function Maintenance() {
  const { t } = useTranslation("a11y");
  const { currentTheme } = useContext(ThemeContext);
  return (
    <MaintenanceWrapper>
      <ThemeWrapper>
        <Theme />
      </ThemeWrapper>
      <LanguageWrapper>
        <Language />
      </LanguageWrapper>
      <MaintenanceContent>
        <LogoWrapper>
          <Logo
            src={
              currentTheme === "light"
                ? "/img/logo_light.webp"
                : "/img/logo_dark.webp"
            }
            alt={t("logo_label")}
          />
        </LogoWrapper>
        <Content>
          <Title variant="h4">{t("title")}</Title>
          <Message variant="subtitle1">{t("message")}</Message>
        </Content>
      </MaintenanceContent>
    </MaintenanceWrapper>
  );
}
