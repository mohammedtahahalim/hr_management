import { Box, styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/ar";
import "dayjs/locale/ja";

const CalendarWrapper = styled(Box)({
  width: "100%",
  height: "325px",
  alignSelf: "center",
});

export default function Calendar() {
  const { i18n } = useTranslation();
  const lang = i18n.language as TLanguage;
  const [searchParams, setSearchParams] = useSearchParams();
  const rawDate = searchParams.get("date") ?? new Date().toISOString();
  const currDate = dayjs(rawDate);

  const changeDate = (e: PickerValue) => {
    setSearchParams((searchParams) => {
      searchParams.set("date", dayjs(e).format("YYYY-MM-DD"));
      return searchParams;
    });
  };

  return (
    <CalendarWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
        <DateCalendar value={currDate} onChange={(e) => changeDate(e)} />
      </LocalizationProvider>
    </CalendarWrapper>
  );
}
