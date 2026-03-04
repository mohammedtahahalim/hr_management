import { Box, MenuItem, Select, styled } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { DistributionWeek } from "../../../shared/lib/types";
import { extractCurrentWeek } from "../../../shared/lib/helpers";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import { fetchDistributions } from "./distributionSlice";

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
  const [week, setWeek] = useState<DistributionWeek>(extractCurrentWeek);
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const getMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toLocaleString(i18n.language, { month: "short" });
  }, [i18n.language]);

  /*
  useEffect(() => {
    const distributionRequest = dispatch(fetchDistributions({ week }));
    return () => {
      distributionRequest.abort();
    };
  }, [week, dispatch]);
  */

  return (
    <WeekWrapper>
      <SelectWrapper
        size="small"
        value={week}
        onChange={(e) => setWeek(e.target.value as DistributionWeek)}
        renderValue={(val) => `${getMonth}.${val}`}
      >
        <Option value={"01-07"}>01-07</Option>
        <Option value={"07-14"}>07-14</Option>
        <Option value={"14-21"}>14-21</Option>
        <Option value={"21-28"}>21-28</Option>
      </SelectWrapper>
    </WeekWrapper>
  );
}
