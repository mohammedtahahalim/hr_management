import { Box, styled, Typography } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectVacancyStatus } from "../vacancySlice";
import { useTranslation } from "react-i18next";

const ExperiencesWrapper = styled(Box)({
  flex: 1,
  minWidth: "250px",
  maxWidth: "350px",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const DistributionWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "5px",
  padding: "0px 5px",
});

const Total = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: "8px",
}));

const Partitions = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const Partition = styled(Box)(({ theme }) => ({
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: "8px",
}));

const Applicants = styled(Typography)({
  width: "100%",
  flex: 1,
  padding: "2px 10px",
  textAlign: "center",
  verticalAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Seniority = styled(Typography)({
  width: "100%",
  flex: 1,
  padding: "2px 10px",
  textAlign: "right",
  verticalAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export default function Experiences() {
  const status = useSelector(selectVacancyStatus);
  const { t } = useTranslation("vacancy");

  return (
    <ExperiencesWrapper>
      <Title variant="h6" ender={false}>
        {t("distribution")}
      </Title>
      <WithSkeleton loading={status === "loading"}>
        <DistributionWrapper>
          <Total>
            <Typography
              variant="h6"
              sx={{
                fontSize: "2rem",
                fontFamily: "system-ui",
                fontWeight: "bold",
              }}
            >
              124
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontFamily: "system-ui", fontStyle: "italic" }}
            >
              {t("candidates")}
            </Typography>
          </Total>
          <Partitions>
            <Partition>
              <Applicants variant="h6">24</Applicants>
              <Seniority variant="subtitle2">{t("junior")}</Seniority>
            </Partition>
            <Partition>
              <Applicants variant="h6">24</Applicants>
              <Seniority variant="subtitle2">{t("mid")}</Seniority>
            </Partition>
            <Partition>
              <Applicants variant="h6">24</Applicants>
              <Seniority variant="subtitle2">{t("senior")}</Seniority>
            </Partition>
          </Partitions>
        </DistributionWrapper>
      </WithSkeleton>
    </ExperiencesWrapper>
  );
}
