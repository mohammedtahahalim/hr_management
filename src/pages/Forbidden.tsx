import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ForbiddenWrapper = styled(Box)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Title = styled(Typography)({
  fontWeight: "bold",
  fontSize: "2.5rem",
});

const Content = styled(Typography)({
  fontStyle: "italic",
  fontFamily: "system-ui",
  fontSize: "1.1rem",
});

export default function Forbidden() {
  const { t } = useTranslation("forbidden");
  return (
    <ForbiddenWrapper>
      <Title variant="h6">{t("title")}</Title>
      <Content variant="subtitle1">{t("content")}</Content>
    </ForbiddenWrapper>
  );
}
