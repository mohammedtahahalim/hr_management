import { Box, styled, Typography } from "@mui/material";
import type { VacancieData } from "../vacancieSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../config/i18n";
import type { PositionColor } from "../../../shared/lib/types";
import { positionColor } from "../../../shared/lib/constants";
import { formatDate, generateRandomImage } from "../../../shared/lib/helpers";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled(Box)(({ theme }) => ({
  minWidth: "325px",
  aspectRatio: 4.5 / 3,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "18px",
  overflow: "hidden",
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "center",
  transition: "all 0.25s ease-in-out",
  "&:hover,&:focus": {
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
  },
}));

const Top = styled(Box)({
  width: "100%",
  flex: 2,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const Position = styled(Box)({
  flex: 1,
  padding: "5px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingLeft: "10px",
});

const Icon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  height: "30px",
  aspectRatio: 1,
  borderRadius: "5px",
  backgroundColor: theme.palette[posColor].main,
}));

const PositionTypo = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.2rem",
});

const MetaInfo = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "5px",
  padding: "0px 10px",
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

const Status = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
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

const Divider = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "1px",
  backgroundColor: theme.palette.divider,
}));

const Bottom = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "5px",
});

const Apps = styled(Box)({
  width: "fit-content",
  display: "flex",
  alignItems: "center",
});

const AppsCount = styled(Typography)({
  paddingLeft: "10px",
  fontFamily: "system-ui",
  fontSize: "1.1rem",
  "& span": {
    fontWeight: "bold",
    fontSize: "1.6rem",
  },
});

const Profiles = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "2px",
  justifyContent: "flex-end",
  alignItems: "center",
});

const Picture = styled("img")({
  height: "30px",
  aspectRatio: "1",
  borderRadius: "50px",
});

const New = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  width: "fit-content",
  borderRadius: "50px",
  fontSize: "0.7rem",
  padding: "2px 4px",
  color: "whitesmoke",
  backgroundColor: theme.palette[posColor].main,
}));

export default function Card({
  applicants,
  id,
  location,
  publication,
  status,
  title,
  newApps,
}: VacancieData) {
  const { i18n, t } = useTranslation(["dashboard", "vacancies"]);
  const navigate = useNavigate();
  const lang = i18n.language as TLanguage;

  const handleEnter = (e: React.KeyboardEvent, id: number) => {
    if (e.key !== "Enter") return;
    navigate(`/vacancies/${id}`);
  };

  return (
    <CardWrapper
      tabIndex={0}
      aria-labelledby={`position-title-${id} position-status-${id} position-applicant-${id}`}
      onClick={() => navigate(`/vacancies/${id}`)}
      onKeyDown={(e) => handleEnter(e, id)}
    >
      <Top>
        <Position>
          <Icon posColor={positionColor[status]} />
          <PositionTypo variant="h6" id={`position-title-${id}`}>
            {title[lang]}
          </PositionTypo>
        </Position>
        <MetaInfo>
          <LocationAndDate>
            <Location>
              {location === "R" ? t("dashboard:recent.remote") : location}
            </Location>
            <Date>{formatDate(publication, i18n.language as TLanguage)}</Date>
          </LocationAndDate>
          <Status>
            <StatusWrapper
              posColor={positionColor[status]}
              id={`position-status-${id}`}
            >
              {t(`vacancies:${status}`)}
            </StatusWrapper>
          </Status>
        </MetaInfo>
      </Top>
      <Divider />
      <Bottom>
        <Apps id={`position-applicant-${id}`}>
          <AppsCount variant="body1">
            <span>{applicants}</span> {t("vacancies:table.apps")}
          </AppsCount>
        </Apps>
        <Profiles>
          {Array.from({ length: Math.min(newApps, 3) }).map((_, idx) => {
            return <Picture key={idx} src={generateRandomImage()} />;
          })}
          {!!newApps && (
            <New posColor={positionColor[status]}>
              +{newApps} {t("dashboard:departments.new")}
            </New>
          )}
        </Profiles>
      </Bottom>
    </CardWrapper>
  );
}
