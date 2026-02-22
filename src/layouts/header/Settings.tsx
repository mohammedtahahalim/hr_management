import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { settingIcons } from "../../shared/lib/constants";

interface SettingsElement {
  element: string;
  path: string;
  icon: string;
}

const SettingsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.divider,
  borderRadius: "8px",
  overflow: "hidden",
}));

const SettingsNavElement = styled(NavLink)(({ theme }) => ({
  width: "100%",
  minWidth: "175px",
  padding: "9px 15px",
  textDecoration: "none",
  borderBottom: `1px solid ${theme.palette.background.default}`,
  color: "inherit",
  display: "flex",
  gap: "8px",
  alignItems: "center",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  transition: "all 0.2s ease-in-out",
  "&:last-child": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.icon.main,
  },
}));

export default function Settings() {
  const { t } = useTranslation("header");
  const settingsNav = t("settings", {
    returnObjects: true,
  }) as SettingsElement[];

  return (
    <SettingsWrapper>
      {Array.isArray(settingsNav) &&
        settingsNav.map((nav) => {
          const Icon = settingIcons[nav.icon];
          return (
            <SettingsNavElement key={nav.element} to={nav.path}>
              {<Icon fontSize="small" color="inherit" />}
              {nav.element}
            </SettingsNavElement>
          );
        })}
    </SettingsWrapper>
  );
}
