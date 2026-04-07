import { Box, styled } from "@mui/material";

interface ScheduleProps {
  activeScheduleId: number;
}

const ScheduleWrapper = styled(Box)({
  position: "fixed",
  top: "50%",
  left: "50%",
  border: "1px solid white",
});

export default function Schedule({ activeScheduleId }: ScheduleProps) {
  console.log(activeScheduleId);
  return <ScheduleWrapper>Schedule</ScheduleWrapper>;
}
