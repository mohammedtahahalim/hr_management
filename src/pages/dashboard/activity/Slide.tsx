import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";
import type { TLanguage } from "../../../config/i18n";

interface SlideProps {
  time: string;
  content: Record<TLanguage, string>;
}

const ActivitySlide = styled(SwiperSlide)(({ theme }) => ({
  width: "95%",
  maxHeight: "70%",
  overflow: "hidden",
  borderRadius: "12px",
  backgroundColor: theme.palette.first.light,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: "5px 10px",
}));

const Time = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "0.85rem",
  color: "wheat",
});

const Note = styled(Typography)({
  flex: 1,
  fontSize: "0.9rem",
  fontFamily: "system-ui",
  fontWeight: "bold",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export default function Slide({ time, content }: SlideProps) {
  const { i18n } = useTranslation();
  const date = new Date(time);
  const activityTime = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  const activityContent = content[i18n.language as TLanguage];
  return (
    <ActivitySlide>
      <Time variant="subtitle1">{activityTime}</Time>
      <Note variant="body1">{activityContent}</Note>
    </ActivitySlide>
  );
}
