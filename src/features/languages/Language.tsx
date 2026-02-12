import { Box, MenuItem, Select, styled } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./LanguageContext";
import type { TLanguage } from "../../config/i18n";

const LanguageWrapper = styled(Box)({
  height: "100%",
  maxHeight: "30px",
  width: "fit-content",
});

const LanguageSelect = styled(Select)({
  textTransform: "uppercase",
  border: "none",
});

const Option = styled(MenuItem)({
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "center",
});

export default function Language() {
  const { i18n, t } = useTranslation("a11y");
  const { changeLanguage } = useContext(LanguageContext);

  return (
    <LanguageWrapper>
      <LanguageSelect
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value as TLanguage)}
        aria-label={t("language")}
        size="small"
      >
        <Option value={"en"}>🇺🇸</Option>
        <Option value={"ja"}>🇯🇵</Option>
        <Option value={"ar"}>🇸🇦</Option>
        <Option value={"fr"}>🇫🇷</Option>
      </LanguageSelect>
    </LanguageWrapper>
  );
}
