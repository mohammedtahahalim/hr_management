import { Box, Button, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

const Title = styled(Typography)({
  fontWeight: "bold",
  fontSize: "3rem",
});

const Content = styled(Typography)({
  fontStyle: "italic",
  fontFamily: "system-ui",
  fontSize: "1.3rem",
});

const SubContent = styled(Typography)({
  fontStyle: "italic",
  fontFamily: "system-ui",
  fontSize: "1rem",
});

const BackToHome = styled(Button)({
  width: "fit-content",
  borderRadius: "50px",
  textTransform: "capitalize",
});

export default function NotFound() {
  const { t } = useTranslation("404");
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <Title variant="h6" color="secondary">
        {t("title")}
      </Title>
      <Box>
        <Content variant="subtitle1">{t("content")}</Content>
        <SubContent variant="body1">{t("subContent")}</SubContent>
      </Box>
      <BackToHome
        variant="contained"
        onClick={() => navigate("/", { replace: true })}
      >
        {t("backToHome")}
      </BackToHome>
    </NotFoundWrapper>
  );
}
