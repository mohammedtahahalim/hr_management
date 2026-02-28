import { Box, styled } from "@mui/material";
import Status from "./Status";
import RecentApps from "./RecentApps";

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
  return (
    <CandidateWrapper>
      <Status />
      <RecentApps />
    </CandidateWrapper>
  );
}
