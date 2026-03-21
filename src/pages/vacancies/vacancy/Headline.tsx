import { Box, IconButton, styled } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Title from "../../../shared/ui/Title";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectVacancyStatus, selectVacancyTitle } from "./vacancySlice";

import type { TLanguage } from "../../../config/i18n";

const HeadlineWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  gap: "10px",
  alignItems: "center",
});

const TitleWrapper = styled(Box)({
  minHeight: "40px",
  minWidth: "300px",
});

export default function Headline() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("vacancy");
  const status = useSelector(selectVacancyStatus);
  const title = useSelector(selectVacancyTitle);

  return (
    <HeadlineWrapper>
      <IconButton
        onClick={() => navigate("/vacancies")}
        aria-label={t("iconButtonLabel")}
      >
        {i18n.language === "ar" ? (
          <EastIcon fontSize="medium" />
        ) : (
          <WestIcon fontSize="medium" />
        )}
      </IconButton>
      <TitleWrapper>
        <WithSkeleton loading={status === "loading"}>
          <Title variant="h5" ender={false}>
            {title && title[i18n.language as TLanguage]}
          </Title>
        </WithSkeleton>
      </TitleWrapper>
    </HeadlineWrapper>
  );
}
