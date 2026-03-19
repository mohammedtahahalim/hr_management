import { Box, styled } from "@mui/material";

const ActivityWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: "325px",
  minHeight: "400px",
  border: `1px solid ${theme.palette.background.paper}`,
  borderRadius: "18px",
  padding: "10px",
}));

export default function Activity() {
  return <ActivityWrapper>Activity</ActivityWrapper>;
}
