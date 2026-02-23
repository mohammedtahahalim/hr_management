import { Box, styled } from "@mui/material";

const DashboardWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid red",
});

export default function Dashboard() {
  return <DashboardWrapper>Dashboard</DashboardWrapper>;
}
