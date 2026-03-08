import { Box, styled } from "@mui/material";
import Status from "./Status";
import RecentApps from "./RecentApps";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCandidates,
  selectCandidateError,
  selectCandidateStatus,
} from "./candidateSlice";
import { useEffect } from "react";
import type { AppDispatch } from "../../../config/store";
import Reload from "../../../shared/ui/Reload";

const CandidateWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  maxHeight: "400px",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "10px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    maxHeight: "450px",
  },
}));

export default function Candidate() {
  const status = useSelector(selectCandidateStatus);
  const error = useSelector(selectCandidateError);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const candidateRequest = dispatch(fetchCandidates());
    return () => {
      candidateRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={status === "loading"}>
      {status === "success" && (
        <CandidateWrapper>
          <Status />
          <RecentApps />
        </CandidateWrapper>
      )}
      {status === "failure" && (
        <Reload
          error={error}
          dispatchThunk={() => dispatch(fetchCandidates())}
        />
      )}
    </WithSkeleton>
  );
}
