import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDetailEducation, selectDetailStatus } from "./detailSlice";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import { formatDate } from "../../../../shared/lib/helpers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const EducationWrapper = styled(Box)(({ theme }) => ({
  height: "300px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowY: "scroll",
  scrollbarWidth: "none",
}));

const EducationLine = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "75px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: "10px 20px",
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Degree = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
});

const School = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.7rem",
});

const Graduation = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
});

const GraduationDate = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.8rem",
  fontStyle: "italic",
});

export default function Education() {
  const { t, i18n } = useTranslation("applicants");
  const status = useSelector(selectDetailStatus);
  const parcours = useSelector(selectDetailEducation);
  const lang = i18n.language as TLanguage;

  return (
    <EducationWrapper>
      <WithSkeleton
        loading={status === "loading"}
        sx={{ borderRadius: "12px" }}
      >
        <Title variant="body1" ender={false}>
          {t("details.education.title")}
        </Title>
        {parcours?.map((p, idx) => {
          return (
            <EducationLine key={idx}>
              <Degree>{p.degree[lang]}</Degree>
              <School>{p.school[lang]}</School>
              <Graduation>
                <CalendarTodayIcon sx={{ fontSize: "0.7rem" }} color="info" />
                <GraduationDate>{formatDate(p.graduated, lang)}</GraduationDate>
              </Graduation>
            </EducationLine>
          );
        })}
      </WithSkeleton>
    </EducationWrapper>
  );
}
