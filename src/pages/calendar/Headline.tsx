import { Box, IconButton, styled, Typography } from "@mui/material";
import Title from "../../shared/ui/Title";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { useSearchParams } from "react-router-dom";
import { getISOWeek } from "date-fns";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import { useSelector } from "react-redux";
import { selectCalendarStatus } from "./calendarSlice";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import { getMonthYearFromWeek } from "../../shared/lib/helpers";

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  minHeight: "75px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "5px",
    minHeight: "100px",
  },
}));

const WeekControl = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  height: "100%",
});

const Week = styled(Box)(({ theme }) => ({
  height: "60%",
  minWidth: "125px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const DateContent = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
});

const ControlButton = styled(IconButton)({
  fontSize: "0.9rem",
});

export default function Headline() {
  const { t, i18n } = useTranslation("calendar");
  const lang = i18n.language as TLanguage;
  const [searchParams, setSearchParams] = useSearchParams();
  const currWeek = searchParams.get("week") || getISOWeek(new Date());
  const status = useSelector(selectCalendarStatus);
  const isLoading = status === "loading";

  const moveCalendar = (dir: "next" | "prev") => {
    setSearchParams((searchParams) => {
      const value =
        dir === "next"
          ? Math.min(52, Number(currWeek) + 1)
          : Math.max(1, Number(currWeek) - 1);
      searchParams.set("week", String(value));
      return searchParams;
    });
  };

  return (
    <HeadlineWrapper>
      <Title ender={false}>{t("title")}</Title>
      <WeekControl>
        <ControlButton
          onClick={() => moveCalendar("prev")}
          disabled={isLoading}
          aria-label={t("prevWeek")}
        >
          <WestIcon fontSize="inherit" />
        </ControlButton>
        <Week>
          <WithSkeleton loading={isLoading} sx={{ borderRadius: "50px" }}>
            <DateContent>{getMonthYearFromWeek(currWeek, lang)}</DateContent>
          </WithSkeleton>
        </Week>
        <ControlButton
          onClick={() => moveCalendar("next")}
          disabled={isLoading}
          aria-label={t("nextweek")}
        >
          <EastIcon fontSize="inherit" />
        </ControlButton>
      </WeekControl>
    </HeadlineWrapper>
  );
}
