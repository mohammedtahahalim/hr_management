import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import Weeks from "./Weeks";
import Data from "./Data";
import { useSearchParams } from "react-router-dom";
import { getISOWeek } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { fetchCalendarEvents } from "./calendarSlice";

const CalendarWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid white",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export default function Calendar() {
  const [searchParams, _] = useSearchParams();
  const week = String(searchParams.get("week") ?? getISOWeek(new Date()));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const calendarRequest = dispatch(fetchCalendarEvents({ week }));
    return () => {
      calendarRequest.abort();
    };
  }, [week, dispatch]);

  return (
    <CalendarWrapper>
      <Headline />
      <Weeks />
      <Data />
    </CalendarWrapper>
  );
}
