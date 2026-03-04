import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Title from "./Title";
import Week from "./Week";
import Stats from "./Stats";

const DistributionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const ControlWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "50px",
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const ContentWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  border: "1px solid black",
});

export default function Distribution() {
  return (
    <WithSkeleton loading={false}>
      <DistributionWrapper>
        <ControlWrapper>
          <Title />
          <Week />
        </ControlWrapper>
        <ContentWrapper>
          <Stats />
        </ContentWrapper>
      </DistributionWrapper>
    </WithSkeleton>
  );
}
