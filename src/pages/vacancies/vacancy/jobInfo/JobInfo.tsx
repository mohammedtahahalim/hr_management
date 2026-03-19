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

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  flex: 2,
  minWidth: "450px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
  },
}));

const ActivityWrapper = styled(Box)({
  flex: 1,
  minWidth: "325px",
  minHeight: "400px",
});

export default function JobInfo() {
  return (
    <JobInfoWrapper>
      <DescriptionWrapper>
        <Description />
      </DescriptionWrapper>
      <ActivityWrapper>
        <Activity />
      </ActivityWrapper>
    </JobInfoWrapper>
  );
}
