import { Box, styled } from "@mui/material";
import Card from "./Card";

const MiniStatsWrapper = styled(Box)({
  width: "fit-content",
  minHeight: "150px",
  margin: "0 auto",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
});

export default function MiniStats() {
  return (
    <MiniStatsWrapper>
      <Card />
      <Card />
      <Card />
      <Card />
    </MiniStatsWrapper>
  );
}
