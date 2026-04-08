import { Box, styled } from "@mui/material";
import Title from "../../shared/ui/Title";

const StatsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const StatsBox = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

const Stat = styled(Box)({
  minWidth: "350px",
  flex: 1,
  border: "1px solid white",
});

export default function Stats() {
  return (
    <StatsWrapper>
      <Title ender={false}>Overview</Title>
      <StatsBox>
        <Stat></Stat>
        <Stat></Stat>
        <Stat></Stat>
      </StatsBox>
    </StatsWrapper>
  );
}
