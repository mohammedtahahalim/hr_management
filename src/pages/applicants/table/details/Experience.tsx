import { Box, styled, Typography } from "@mui/material";
import type { Experience as ExperienceProps } from "./detailSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import { formatDate } from "../../../../shared/lib/helpers";

const ExperienceWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "10px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Details = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const Position = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.1rem",
});

const Meta = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const Location = styled(Box)({
  fontFamily: "system-ui",
  fontSize: "0.8rem",
});

const Time = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});

const Company = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.8rem",
});

const Tasks = styled("ul")({
  paddingLeft: "15px",
});

const Task = styled("li")({
  fontStyle: "italic",
  fontSize: "0.85rem",
});

export default function Experience({
  position,
  company,
  tasks,
  location,
  startDate,
  endDate,
}: ExperienceProps) {
  const { i18n, t } = useTranslation("applicants");
  return (
    <ExperienceWrapper>
      <Details>
        <Position variant="h6">{position[i18n.language as TLanguage]}</Position>
        <Meta>
          <Time>
            <Typography sx={{ fontSize: "0.7rem" }}>
              {formatDate(startDate, i18n.language as TLanguage, true, false)}
            </Typography>
            {"--"}
            <Typography sx={{ fontSize: "0.7rem" }}>
              {endDate
                ? formatDate(endDate, i18n.language as TLanguage, true, false)
                : t("details.experience.current")}
            </Typography>
          </Time>
          <Location>{t(`details.experience.location.${location}`)}</Location>
        </Meta>
      </Details>
      <Company variant="body1">{company[i18n.language as TLanguage]}</Company>
      <Tasks>
        {tasks.map((t, idx) => {
          return (
            <Task key={`${t[i18n.language as TLanguage]}-${idx}`}>
              {t[i18n.language as TLanguage]}
            </Task>
          );
        })}
      </Tasks>
    </ExperienceWrapper>
  );
}
