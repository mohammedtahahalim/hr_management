import { Box, styled } from "@mui/material";
import Bar from "./Bar";
import Overview from "./Overview";

const CardWrapper = styled(Box)(({ theme }) => ({
  width: "275px",
  aspectRatio: "2/1",
  display: "flex",
  gap: "5px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  overflow: "hidden",
}));

export default function Card() {
  return (
    <CardWrapper>
      <Bar />
      <Overview />
    </CardWrapper>
  );
}
