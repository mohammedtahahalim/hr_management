import { Box, styled, Typography } from "@mui/material";

interface EventProps {
  date: string;
  title: string;
  content: string;
}

const EventWrapper = styled(Box)({
  width: "100%",
  minHeight: "60px",
  display: "flex",
  gap: "5px",
});

const DateWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  aspectRatio: 1,
  backgroundColor: theme.palette.first.light,
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "whitesmoke",
}));

const Day = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.1rem",
});

const Month = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

const EventDetails = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2px",
  color: "whitesmoke",
});

const EventTitle = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.1rem",
});

const EventContent = styled(Typography)({
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "0.9rem",
});

export default function Event({ date, title, content }: EventProps) {
  const [day, month] = date.split(" ");
  return (
    <EventWrapper>
      <DateWrapper>
        <Day variant="h6">{day}</Day>
        <Month variant="subtitle1">{month}</Month>
      </DateWrapper>
      <EventDetails>
        <EventTitle variant="h6">{title.substring(0, 45)}</EventTitle>
        <EventContent variant="body1">{content.substring(0, 45)}</EventContent>
      </EventDetails>
    </EventWrapper>
  );
}
