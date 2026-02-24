import { Box, styled } from "@mui/material";
import Candidate from "./Candidate";
import Department from "./Department";
import Distribution from "./Distribution";
import Recent from "./Recent";
import Collection from "./Collection";
import Activity from "./Activity";

const DashboardWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
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

const CandidateWrapper = styled(Box)({
  minHeight: "300px",
  border: "1px solid black",
  flex: 1,
});

const DepartmentWrapper = styled(Box)({
  minHeight: "300px",
  border: "1px solid black",
  flex: 1,
});

const DistributionWrapper = styled(Box)({
  minHeight: "300px",
  border: "1px solid black",
  flex: 1,
});

const Stats = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const RecentWrapper = styled(Box)({
  flex: 2,
  minHeight: "300px",
  border: "1px solid black",
});

const ResourcesWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minHeight: "300px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const CollectionWrapper = styled(Box)({
  flex: 1,
  border: "1px solid black",
});

const ActivityWrapper = styled(Box)({
  flex: 1,
  border: "1px solid black",
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
        <ResourcesWrapper>
          <CollectionWrapper>
            <Collection />
          </CollectionWrapper>
          <ActivityWrapper>
            <Activity />
          </ActivityWrapper>
        </ResourcesWrapper>
      </Stats>
    </DashboardWrapper>
  );
}
