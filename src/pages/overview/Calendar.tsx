import { Box, styled } from "@mui/material";

const CalendarWrapper = styled(Box)({
  width: "100%",
  height: "300px",
  border: "1px solid white",
  alignSelf: "center",
});

export default function Calendar() {
  return <CalendarWrapper>Calendar</CalendarWrapper>;
}
