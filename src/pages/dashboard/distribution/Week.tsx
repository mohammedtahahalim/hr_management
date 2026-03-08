import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useMemo } from "react";
import { extractCurrentWeek } from "../../../shared/lib/helpers";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const WeekWrapper = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  [theme.breakpoints.down("sm")]: {
    alignSelf: "flex-end",
  },
}));

const SelectWrapper = styled(Select)({
  minWidth: "100px",
  fontStyle: "italic",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

const Option = styled(MenuItem)({
  fontStyle: "italic",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

export default function Week() {
  const { search } = useLocation();
  const week = new URLSearchParams(search).get("week") ?? extractCurrentWeek();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation("dashboard");

  const month = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toLocaleString(i18n.language, { month: "short" });
  }, [i18n.language]);

  return (
    <WeekWrapper>
      <FormControl size="small">
        <InputLabel id="week-select-label">
          {t("distributions.week")}
        </InputLabel>
        <SelectWrapper
          id="week-select"
          labelId="week-select-label"
          label={t("week", "Week")}
          value={week}
          onChange={(e) => navigate(`?week=${e.target.value}`)}
          renderValue={(val) => `${month}.${val}`}
        >
          <Option value="01-07">01-07</Option>
          <Option value="07-14">07-14</Option>
          <Option value="14-21">14-21</Option>
          <Option value="21-28">21-28</Option>
        </SelectWrapper>
      </FormControl>
    </WeekWrapper>
  );
}
