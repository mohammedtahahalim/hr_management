import { Box, styled } from "@mui/material";
import Application from "./Application";
import Employment from "./Employment";
import Project from "./Project";
import Office from "./Office";
import Birthday from "./Birthday";
import Calendar from "./Calendar";
import Activity from "./Activity";
import Stats from "./Stats";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useEffect } from "react";
import { fetchOverview } from "./overviewSlice";
import useFetchDate from "./useFetchDate";

const OverviewWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  overflowY: "auto",
  scrollbarWidth: "none",
});

const WestSide = styled(Box)({
  flex: 3,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const EastSide = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minWidth: "300px",
  height: "100%",
  flex: 1,
});

const Top = styled(Box)({
  width: "100%",
  height: "fit-content",
});

const Middle = styled(Box)({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  minHeight: "300px",
  flex: 1,
});

const Bottom = styled(Box)({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  minHeight: "350px",
});

export default function Overview() {
  const dispatch = useDispatch<AppDispatch>();
  const date = useFetchDate();

  useEffect(() => {
    const overviewRequest = dispatch(fetchOverview({ date }));
    return () => {
      overviewRequest.abort();
    };
  }, [dispatch, date]);

  return (
    <OverviewWrapper>
      <WestSide>
        <Top>
          <Stats />
        </Top>
        <Middle>
          <Application />
          <Employment />
        </Middle>
        <Bottom>
          <Project />
          <Office />
          <Birthday />
        </Bottom>
      </WestSide>
      <EastSide>
        <Calendar />
        <Activity />
      </EastSide>
    </OverviewWrapper>
  );
}
