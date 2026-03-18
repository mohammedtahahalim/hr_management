import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import JobStats from "./JobStats";
import JobInfo from "./JobInfo";

const VacancyWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  border: "1px solid crimson",
});

const HeadlineContainer = styled(Box)({
  width: "100%",
});

const JobStatsContainer = styled(Box)({
  width: "100%",
});

const JobInfoContainer = styled(Box)({});

export default function Vacancy() {
  return (
    <VacancyWrapper>
      <HeadlineContainer>
        <Headline />
      </HeadlineContainer>
      <JobStatsContainer>
        <JobStats />
      </JobStatsContainer>
      <JobInfoContainer>
        <JobInfo />
      </JobInfoContainer>
    </VacancyWrapper>
  );
}
