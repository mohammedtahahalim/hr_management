import { Box, styled, Typography } from "@mui/material";
import WaitEmployeeMode from "../WaitEmployeeMode";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectEmployeeEducation } from "../employeeSlice";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import type { TLanguage } from "../../../../config/i18n";
import { formatDate } from "../../../../shared/lib/helpers";

const EducationWrapper = styled(Box)(({ theme }) => ({
  minWidth: "325px",
  height: "100%",
  maxHeight: "255px",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
  padding: "5px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const EducationBox = styled(Box)(({ theme }) => ({
  flex: 1,
  width: "100%",
  minHeight: "80px",
  display: "flex",
  flexDirection: "column",
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  padding: "0px 5px",
  gap: "5px",
}));

const Degree = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1rem",
  textTransform: "capitalize",
});

const School = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "0.8rem",
});

const Graduation = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});

export default function Education() {
  const { t, i18n } = useTranslation("employee");
  const lang = i18n.language as TLanguage;
  const educations = useSelector(selectEmployeeEducation);

  return (
    <WaitEmployeeMode>
      <EducationWrapper>
        <Title ender={false}>{t("education.title")}</Title>
        {Array.isArray(educations) &&
          educations.map((e) => {
            return (
              <EducationBox key={`${e.degree.en}-${e.school.en}`}>
                <Degree variant="body1">{e.degree[lang]}</Degree>
                <School variant="subtitle1">{e.school[lang]}</School>
                <Graduation>
                  <EventAvailableIcon
                    fontSize="small"
                    sx={{ fontSize: "0.8rem" }}
                  />
                  <Typography variant="subtitle1" sx={{ fontSize: "0.8rem" }}>
                    {formatDate(e.graduated, lang)}
                  </Typography>
                </Graduation>
              </EducationBox>
            );
          })}
      </EducationWrapper>
    </WaitEmployeeMode>
  );
}
