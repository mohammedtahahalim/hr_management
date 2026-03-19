import { Box, styled } from "@mui/material";
import Description from "./Description";
import Activity from "./Activity";

const JobInfoWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  padding: "10px",
});

export default function JobInfo() {
  return (
    <JobInfoWrapper>
      <Description />
      <Activity />
    </JobInfoWrapper>
  );
}
