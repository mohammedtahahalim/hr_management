import { Box, styled, Typography } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVacancy,
  selectDistributions,
  selectVacancyError,
  selectVacancyStatus,
} from "../vacancySlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../../../../config/store";
import Reload from "../../../../shared/ui/Reload";

const ExperiencesWrapper = styled(Box)({
  height: "100%",
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
  const error = useSelector(selectVacancyError);
  const { id = "1" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("vacancy");
  const distribution = useSelector(selectDistributions);

  return (
    <ExperiencesWrapper>
      <Title variant="h6" ender={false}>
        {t("distribution")}
      </Title>
      <WithSkeleton loading={status === "loading"} sx={{ minHeight: "200px" }}>
        {status === "success" && (
          <DistributionWrapper>
            <Total
              tabIndex={0}
              aria-label={`${distribution?.total} ${t("candidates")}`}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "2rem",
                  fontFamily: "system-ui",
                  fontWeight: "bold",
                }}
              >
                {distribution?.total}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "system-ui", fontStyle: "italic" }}
              >
                {t("candidates")}
              </Typography>
            </Total>
            <Partitions>
              {distribution?.data.map((d) => {
                return (
                  <Partition
                    key={d.type}
                    aria-label={`${d.total} ${t(`${d.type}`)}`}
                    tabIndex={0}
                  >
                    <Applicants variant="h6">{d.total}</Applicants>
                    <Seniority variant="subtitle2">{t(`${d.type}`)}</Seniority>
                  </Partition>
                );
              })}
            </Partitions>
          </DistributionWrapper>
        )}
        {status === "failure" && (
          <Reload
            error={error}
            dispatchThunk={() => dispatch(fetchVacancy({ id }))}
          />
        )}
      </WithSkeleton>
    </ExperiencesWrapper>
  );
}
