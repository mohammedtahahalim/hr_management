import { Box, styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import Theme from "../../features/themes/Theme";
import Language from "../../features/languages/Language";
import Notifications from "../../features/notifications/Notifications";
import Settings from "./Settings";
import Time from "./Time";

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

const Search = styled(TextField)({
  height: "100%",
  paddingLeft: "50px",
  border: "none",
  width: "100%",
  "& fieldset": {
    border: "none",
  },
  "& > *": {
    maxHeight: "100%",
  },
});

const SearchIconWrapper = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  height: "100%",
  aspectRatio: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Icon = styled(SearchIcon)(({ theme }) => ({
  fontSize: "1.7rem",
  color: theme.palette.icon.main,
}));

const ControlArea = styled(Box)(({ theme }) => ({
  flex: 1.3,
  height: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: "12.5px",
  "& > *:not(:last-child)": {
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

export default function Header() {
  const { t } = useTranslation("header");

  return (
    <HeaderWrapper>
      <SearchArea>
        <Search placeholder={t("search")} />
        <SearchIconWrapper>
          <Icon />
        </SearchIconWrapper>
      </SearchArea>
      <ControlArea>
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
