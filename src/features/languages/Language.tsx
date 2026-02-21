import { alpha, Box, MenuItem, Select, styled } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./LanguageContext";
import type { TLanguage } from "../../config/i18n";

interface LanguageProps {
  isFree?: boolean;
}

const LanguageWrapper = styled(Box)({
  height: "100%",
  width: "fit-content",
});

const LanguageSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "isFree",
})<LanguageProps>(({ isFree, theme }) => ({
  height: "100%",
  textTransform: "uppercase",
  border: "none",
  "& fieldset": {
    border: isFree ? "none" : `1px solid ${alpha(theme.palette.divider, 0.05)}`,
  },
}));

const Option = styled(MenuItem)({
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "center",
});

export default function Language({ isFree = false }: LanguageProps) {
  const { i18n, t } = useTranslation("a11y");
  const { changeLanguage } = useContext(LanguageContext);

  return (
    <LanguageWrapper>
      <LanguageSelect
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value as TLanguage)}
        aria-label={t("language")}
        size="small"
        isFree={isFree}
        id="language"
      >
        <Option value={"en"} id="english" aria-label="Engish">
          🇺🇸
        </Option>
        <Option value={"ja"} id="japanese" aria-label="日本語">
          🇯🇵
        </Option>
        <Option value={"ar"} id="arabic" aria-label="العربية">
          🇸🇦
        </Option>
        <Option value={"fr"} id="french" aria-label="française">
          🇫🇷
        </Option>
      </LanguageSelect>
    </LanguageWrapper>
  );
}
