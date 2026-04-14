import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { fetchMonth } from "../../../shared/lib/helpers";
import type { TLanguage } from "../../../config/i18n";

interface EventProps {
  date: string;
  title: string;
  content: string;
  id: number;
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
  minWidth: "55px",
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
  minWidth: 0,
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

export default function Event({ date, title, content, id }: EventProps) {
  const { i18n } = useTranslation("common");
  const [day, month] = date.split("-");
  const formattedDate = fetchMonth(Number(month), i18n.language as TLanguage);
  return (
    <EventWrapper
      tabIndex={0}
      aria-describedby={`event-title-${id} event-content-${id}`}
    >
      <DateWrapper>
        <Day variant="h6">{day}</Day>
        <Month variant="subtitle1">{formattedDate}</Month>
      </DateWrapper>
      <EventDetails>
        <EventTitle variant="h6" id={`event-title-${id}`}>
          {title}
        </EventTitle>
        <EventContent variant="body1" id={`event-content-${id}`}>
          {content}
        </EventContent>
      </EventDetails>
    </EventWrapper>
  );
}
