import { Box, styled } from "@mui/material";

const AttendanceWrapper = styled(Box)({
  flex: 2,
  border: "1px solid black",
});

export default function Attendance() {
  return <AttendanceWrapper>Attendance</AttendanceWrapper>;
}
