import { Box, styled } from "@mui/material";
import Title from "../../shared/ui/Title";
import { useTranslation } from "react-i18next";

const HeadlineWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
});

export default function Headline() {
  const { t } = useTranslation("applicants");
  return (
    <HeadlineWrapper>
      <Title ender={false}>{t("title")}</Title>
    </HeadlineWrapper>
  );
}
