import { Box, styled } from "@mui/material";
import Title from "../../shared/ui/Title";
import type { PositionColor } from "../../shared/lib/types";

const StatsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minHeight: "150px",
});

const StatsBox = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

const Stat = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  minWidth: "300px",
  flex: 1,
  borderRadius: "6px",
  backgroundColor: theme.palette[posColor].light,
  minHeight: "175px",
}));

export default function Stats() {
  return (
    <StatsWrapper>
      <Title ender={false}>Overview</Title>
      <StatsBox>
        <Stat posColor="second"></Stat>
        <Stat posColor="first"></Stat>
        <Stat posColor="third"></Stat>
      </StatsBox>
    </StatsWrapper>
  );
}
