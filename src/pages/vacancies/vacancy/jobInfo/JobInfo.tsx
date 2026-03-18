import { Box, styled } from "@mui/material";

const JobInfoWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  border: "1px solid white",
  padding: "10px",
});

export default function JobInfo() {
  return <JobInfoWrapper>JobInfo</JobInfoWrapper>;
}
