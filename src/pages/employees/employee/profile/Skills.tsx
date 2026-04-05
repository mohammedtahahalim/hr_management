import { Box, styled, Typography } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectEmployeeSkills } from "../employeeSlice";
import WaitEmployeeMode from "../WaitEmployeeMode";

const SkillsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "250px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const SkillContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  maxHeight: "100%",
  overflowY: "auto",
  scrollbarWidth: "none",
  gap: "10px",
});

const SkillBox = styled(Box)(({ theme }) => ({
  padding: "3px 10px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "50px",
}));

const SkillContent = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

export default function Skills() {
  const { t } = useTranslation("employee");
  const employeeSkills = useSelector(selectEmployeeSkills);

  return (
    <SkillsWrapper>
      <WaitEmployeeMode>
        <>
          <Title variant="h6" ender={false}>
            {t("skills.title")}
          </Title>
          <SkillContainer>
            {Array.isArray(employeeSkills) &&
              employeeSkills.map((s) => {
                return (
                  <SkillBox key={s}>
                    <SkillContent variant="body1">
                      {t(`skills.${s}`)}
                    </SkillContent>
                  </SkillBox>
                );
              })}
          </SkillContainer>
        </>
      </WaitEmployeeMode>
    </SkillsWrapper>
  );
}
