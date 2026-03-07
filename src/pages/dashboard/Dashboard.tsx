import { Box, styled } from "@mui/material";
import Candidate from "./candidate/Candidate";
import Department from "./departments/Department";
import Distribution from "./distribution/Distribution";
import Recent from "./recent/Recent";

const DashboardWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Informations = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const CandidateWrapper = styled(Box)(({ theme }) => ({
  minHeight: "400px",
  flex: 1,
  overflow: "hidden",
  borderRadius: "18px",
  border: `1px solid ${theme.palette.divider}`,
}));

const DepartmentWrapper = styled(Box)({
  minHeight: "400px",
  flex: 1,
  overflow: "hidden",
  borderRadius: "18px",
});

const DistributionWrapper = styled(Box)({
  minHeight: "400px",
  flex: 1,
  overflow: "hidden",
  borderRadius: "18px",
});

const Stats = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "10px",
  flexDirection: "column",
});

const RecentWrapper = styled(Box)({
  flex: 1,
  minHeight: "400px",
  overflow: "hidden",
  borderRadius: "18px",
});

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <Informations>
        <CandidateWrapper>
          <Candidate />
        </CandidateWrapper>
        <DepartmentWrapper>
          <Department />
        </DepartmentWrapper>
        <DistributionWrapper>
          <Distribution />
        </DistributionWrapper>
      </Informations>
      <Stats>
        <RecentWrapper>
          <Recent />
        </RecentWrapper>
      </Stats>
    </DashboardWrapper>
  );
}
