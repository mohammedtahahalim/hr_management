import { Box, styled } from "@mui/material";
import Attendance from "./Attendance";
import Events from "./Events";
import Applicants from "./Applicants";
import Sources from "./Sources";
import Departments from "./Departments";
import Recent from "./Recent";
import Positions from "./Positions";

const DashboardWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "5px",
  display: "flex",
  gap: "5px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const Stats = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const AttendanceAndNews = styled(Box)(({ theme }) => ({
  width: "300px",
  border: "1px solid black",
  minHeight: "150px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const AppSources = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("xl")]: {
    flexDirection: "column",
  },
}));

const EmployApp = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("xl")]: {
    flexDirection: "column",
  },
}));

const Charts = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <Stats>
        <AppSources>
          <Applicants />
          <Sources />
        </AppSources>
        <EmployApp>
          <Departments />
          <Recent />
        </EmployApp>
        <Charts>
          <Positions />
          <Positions />
          <Positions />
        </Charts>
      </Stats>
      <AttendanceAndNews>
        <Attendance />
        <Events />
      </AttendanceAndNews>
    </DashboardWrapper>
  );
}
