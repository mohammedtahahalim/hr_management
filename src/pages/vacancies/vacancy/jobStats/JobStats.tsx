import { Box, styled } from "@mui/material";
import Overview from "./Overview";
import Applicants from "./Applicants";
import Experiences from "./Experiences";

const JobStatsWrapper = styled(Box)({
  width: "100%",
  minHeight: "225px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  padding: "10px",
});

export default function JobStats() {
  return (
    <JobStatsWrapper>
      <Overview />
      <Applicants />
      <Experiences />
    </JobStatsWrapper>
  );
}
