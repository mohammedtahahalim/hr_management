import { Box, styled } from "@mui/material";

const StatsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid black",
});

export default function Stats() {
  return <StatsWrapper>Stats</StatsWrapper>;
}
