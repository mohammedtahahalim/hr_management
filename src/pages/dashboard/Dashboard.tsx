import { Box, styled } from "@mui/material";
import Candidate from "./candidate/Candidate";
import Department from "./departments/Department";
import Distribution from "./Distribution";
import Recent from "./Recent";
import Collection from "./Collection";
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
  minHeight: "300px",
  flex: 1,
  overflow: "hidden",
  borderRadius: "18px",
  border: `1px solid ${theme.palette.divider}`,
}));

const DepartmentWrapper = styled(Box)({
  minHeight: "300px",
  flex: 1,
  overflow: "hidden",
  borderRadius: "18px",
});

const DistributionWrapper = styled(Box)({
  minHeight: "300px",
  overflow: "hidden",
  borderRadius: "18px",
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
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const CollectionWrapper = styled(Box)({
  flex: 1,
  overflow: "hidden",
  borderRadius: "18px",
});

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
          <WithSkeleton loading={false}>
            <Department />
          </WithSkeleton>
        </DepartmentWrapper>
        <DistributionWrapper>
          <WithSkeleton loading={true}>
            <Distribution />
          </WithSkeleton>
        </DistributionWrapper>
      </Informations>
      <Stats>
        <RecentWrapper>
          <WithSkeleton loading={true}>
            <Recent />
          </WithSkeleton>
        </RecentWrapper>
        <ResourcesWrapper>
          <CollectionWrapper>
            <WithSkeleton loading>
              <Collection />
            </WithSkeleton>
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
