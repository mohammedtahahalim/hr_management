import { Box, styled, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import Theme from "../../features/themes/Theme";
import Language from "../../features/languages/Language";
import Notifications from "../../features/notifications/Notifications";
import Settings from "./Settings";
import Time from "./Time";
import Sandwitch from "./Sandwitch";

const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  alignItems: "center",
}));

const SearchArea = styled(Box)(({ theme }) => ({
  flex: 1,
  height: "100%",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Search = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  height: "100%",
  ...(isArabic ? { paddingRight: "50px" } : { paddingLeft: "50px" }),
  width: "100%",
  fontStyle: "italic",
  fontFamily: "system-ui",
  "& fieldset": {
    border: "none",
  },
  "& > *": {
    maxHeight: "100%",
  },
  color: theme.palette.icon.main,
}));

const SearchIconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  position: "absolute",
  top: "0",
  ...(isArabic ? { right: "0" } : { left: "0" }),
  height: "100%",
  aspectRatio: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Icon = styled(SearchIcon)(({ theme }) => ({
  fontSize: "1.7rem",
  color: theme.palette.icon.main,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const ControlArea = styled(Box)(({ theme }) => ({
  flex: 1.3,
  height: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: "12.5px",
  "& > *:not(:last-child):not(:first-of-type)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    aspectRatio: "1",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const ThemeWrapper = styled(Box)({
  height: "100%",
  aspectRatio: "1",
});

const LanguageWrapper = styled(Box)({
  height: "100%",
  aspectRatio: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const MobileSandwitch = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    aspectRatio: "1",
  },
}));

export default function Header() {
  const { t, i18n } = useTranslation("header");
  const isArabic = i18n.language === "ar";

  return (
    <HeaderWrapper>
      <SearchArea>
        <Search placeholder={t("search")} isArabic={isArabic} />
        <SearchIconWrapper isArabic={isArabic}>
          <Icon />
          <Sandwitch />
        </SearchIconWrapper>
      </SearchArea>
      <ControlArea>
        <MobileSandwitch>
          <Sandwitch />
        </MobileSandwitch>
        <ThemeWrapper>
          <Theme />
        </ThemeWrapper>
        <Notifications />
        <Settings />
        <LanguageWrapper>
          <Language />
        </LanguageWrapper>
        <Time />
      </ControlArea>
    </HeaderWrapper>
  );
}
