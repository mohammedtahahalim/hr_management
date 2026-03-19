import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import JobStats from "./jobStats/JobStats";
import JobInfo from "./jobInfo/JobInfo";
import { useDispatch } from "react-redux";
import { fetchVacancy } from "./vacancySlice";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const VacancyWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HeadlineContainer = styled(Box)({
  width: "100%",
});

const JobStatsContainer = styled(Box)({
  width: "100%",
});

const JobInfoContainer = styled(Box)({
  flex: 2,
  width: "100%",
  border: "1px solid black",
});

export default function Vacancy() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchVacancy({ id }));
  }, [dispatch, id]);

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
