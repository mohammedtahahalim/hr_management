import { Box, styled } from "@mui/material";
import Status from "./Status";
import RecentApps from "./RecentApps";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../../../shared/lib/helpers";
import { fetchCandidates, selectStatus } from "./candidateSlice";
import { useEffect } from "react";
import type { AppDispatch } from "../../../config/store";

const CandidateWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  maxHeight: "400px",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export default function Candidate() {
  const candidateStatus = useSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const candidateRequest = dispatch(fetchCandidates());
    return () => {
      candidateRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={isLoading(candidateStatus)}>
      <CandidateWrapper>
        <Status />
        <RecentApps />
      </CandidateWrapper>
    </WithSkeleton>
  );
}
