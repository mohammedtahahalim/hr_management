import { Box, styled, Typography } from "@mui/material";
import type { VacancieData } from "../vacancieSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../config/i18n";
import type { PositionColor } from "../../../shared/lib/types";
import { positionColor } from "../../../shared/lib/constants";
import { formatDate } from "../../../shared/lib/helpers";

const CardWrapper = styled(Box)(({ theme }) => ({
  minWidth: "300px",
  aspectRatio: 4 / 3,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "18px",
  overflow: "hidden",
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "center",
}));

const Top = styled(Box)({
  width: "100%",
  flex: 2,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const Position = styled(Typography)({
  flex: 1,
  padding: "5px",
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.2rem",
});

const MetaInfo = styled(Box)({
  flex: 1,
  padding: "5px",
  display: "flex",
  gap: "5px",
});

const LocationAndDate = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  justifyContent: "center",
  fontFamily: "system-ui",
});

const Location = styled(Box)({
  fontWeight: "bold",
});

const Date = styled(Box)({
  fontStyle: "italic",
});

const StatusWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  width: "fit-content",
  padding: "5px 8px",
  borderRadius: "50px",
  color: "whitesmoke",
  backgroundColor: theme.palette[posColor].main,
}));

const Status = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Divider = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "1px",
  backgroundColor: theme.palette.divider,
}));

const Bottom = styled(Box)({
  flex: 1,
});

const Apps = styled(Typography)({});

const Profiles = styled(Box)({});

const Picture = styled("img")({});

const New = styled(Box)({});

export default function Card({
  applicants,
  id,
  location,
  publication,
  status,
  title,
  trend,
}: VacancieData) {
  const { i18n, t } = useTranslation(["dashboard", "vacancies"]);
  const lang = i18n.language as TLanguage;

  return (
    <CardWrapper>
      <Top>
        <Position>{title[lang]}</Position>
        <MetaInfo>
          <LocationAndDate>
            <Location>
              {location === "R" ? t("dashboard:recent.remote") : location}
            </Location>
            <Date>{formatDate(publication, i18n.language as TLanguage)}</Date>
          </LocationAndDate>
          <Status>
            <StatusWrapper posColor={positionColor[status]}>
              {t(`vacancies:${status}`)}
            </StatusWrapper>
          </Status>
        </MetaInfo>
      </Top>
      <Divider />
      <Bottom>
        <Apps></Apps>
        <Profiles>
          <Picture />
          <New />
        </Profiles>
      </Bottom>
    </CardWrapper>
  );
}
