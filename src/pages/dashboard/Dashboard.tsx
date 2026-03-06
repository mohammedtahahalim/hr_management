import { Box, styled } from "@mui/material";
import Candidate from "./candidate/Candidate";
import Department from "./departments/Department";
import Distribution from "./distribution/Distribution";
import Recent from "./recent/Recent";
import Collection from "./collection/Collection";
import Activity from "./Activity";
import WithSkeleton from "../../shared/ui/WithSkeleton";

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
  minHeight: "400px",
  overflow: "hidden",
  borderRadius: "18px",
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
    maxHeight: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    minHeight: "500px",
  },
}));

const CollectionWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "18px",
}));

const ActivityWrapper = styled(Box)({
  flex: 1,
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
        <ResourcesWrapper>
          <CollectionWrapper>
            <Collection />
          </CollectionWrapper>
          <ActivityWrapper>
            <WithSkeleton loading>
              <Activity />
            </WithSkeleton>
          </ActivityWrapper>
        </ResourcesWrapper>
      </Stats>
    </DashboardWrapper>
  );
}
