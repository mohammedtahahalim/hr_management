import { Box, styled } from "@mui/material";

const RecentWrapper = styled(Box)({
  flex: 1.25,
  display: "flex",
  border: "1px solid black",
  minHeight: "300px",
});

export default function Recent() {
  return <RecentWrapper>Recent</RecentWrapper>;
}
