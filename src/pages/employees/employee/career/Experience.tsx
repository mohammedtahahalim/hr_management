import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import WaitEmployeeMode from "../WaitEmployeeMode";
import Title from "../../../../shared/ui/Title";
import { useSelector } from "react-redux";
import { selectEmployeeExerience } from "../employeeSlice";
import type { TLanguage } from "../../../../config/i18n";
import { formatDate } from "../../../../shared/lib/helpers";

const ExperienceWrapper = styled(Box)({
  minWidth: "325px",
  height: "100%",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowY: "scroll",
  scrollbarWidth: "none",
  maxHeight: "550px",
});

const ExperienceSegment = styled(Box)(({ theme }) => ({
  width: "100%",
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Meta = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Position = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "1.1rem",
});

const JoinDate = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.75rem",
});

const Company = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.95rem",
});

const Tasks = styled("ul", {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  listStyleType: "square",
  padding: "10px 0px",
  ...(isArabic ? { paddingRight: "20px" } : { paddingLeft: "20px" }),
}));

const Task = styled("li")({
  fontFamily: "system-ui",
  fontSize: "0.8rem",
});

export default function Experience() {
  const { t, i18n } = useTranslation("employee");
  const lang = i18n.language as TLanguage;
  const isArabic = lang === "ar";
  const experience = useSelector(selectEmployeeExerience);

  return (
    <WaitEmployeeMode>
      <ExperienceWrapper>
        <Title ender={false}>{t("experience.title")}</Title>
        {Array.isArray(experience) &&
          experience.map((e) => {
            return (
              <ExperienceSegment key={e.startDate}>
                <Meta>
                  <Position>{t(`experience.positions.${e.position}`)}</Position>
                  <JoinDate>
                    {formatDate(e.startDate, lang)} -{" "}
                    {e.endDate
                      ? formatDate(e.endDate, lang)
                      : t("experience.present")}
                  </JoinDate>
                </Meta>
                <Company>{e.company[lang]}</Company>
                <Tasks isArabic={isArabic}>
                  {e.tasks.map((t) => {
                    return <Task key={t.en}>{t[lang]}</Task>;
                  })}
                </Tasks>
              </ExperienceSegment>
            );
          })}
      </ExperienceWrapper>
    </WaitEmployeeMode>
  );
}
