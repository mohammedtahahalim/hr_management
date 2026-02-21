import { Box, styled, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { formateDate, formateDateToLong } from "../../shared/lib/constants";
import type { TLanguage } from "../../config/i18n";

const TimeContainer = styled(Box)(({ theme }) => ({
  padding: "0px 15px",
  color: theme.palette.icon.main,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export default function Time() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const { i18n } = useTranslation();
  const lastInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const matches = useMediaQuery("(min-width:1100px)");

  useEffect(() => {
    lastInterval.current = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        matches
          ? formateDateToLong(date, i18n.language as TLanguage)
          : formateDate(date, i18n.language as TLanguage),
      );
    }, 1);
    return () => {
      if (lastInterval.current) clearInterval(lastInterval.current);
    };
  }, [i18n, matches]);

  return <TimeContainer>{currentTime}</TimeContainer>;
}
