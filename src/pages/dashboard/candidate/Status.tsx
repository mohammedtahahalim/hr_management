import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const StatusWrapper = styled(Box)({
  flex: 1,
  minHeight: "200px",
  padding: "10px",
});

const Title = styled(Typography)({});

const Employers = styled(Typography)({});

const ApplicantPercentage = styled(Box)({});

const Total = styled(Box)({});

const Shortlisted = styled(Box)({});

const Rejected = styled(Box)({});

export default function Status() {
  const { t } = useTranslation("dashboard");

  return (
    <StatusWrapper>
      <Title>{t("candidate.status.title")}</Title>
      <Employers>
        {} {t("candidate.status.employers")}
      </Employers>
      <ApplicantPercentage>
        <Total></Total>
        <Shortlisted></Shortlisted>
        <Rejected></Rejected>
      </ApplicantPercentage>
    </StatusWrapper>
  );
}
