import { Box, styled } from "@mui/material";
import Title from "../../shared/ui/Title";
import { useTranslation } from "react-i18next";

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  minHeight: "75px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "5px",
    minHeight: "100px",
  },
}));

const Headline = () => {
  const { t } = useTranslation("payroll");

  return (
    <HeadlineWrapper>
      <Title ender={false}>{t("headline.title")}</Title>
    </HeadlineWrapper>
  );
};

export default Headline;
