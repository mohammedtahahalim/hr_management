import { Box, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import { fetchApplicantsOverview } from "./applicantOverview";
import Open from "./Open";
import Active from "./Active";
import Hiring from "./Hiring";
import Experience from "./Experience";

const MiniStatsWrapper = styled(Box)({
  width: "fit-content",
  margin: "0 auto",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
});

export default function MiniStats() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const applicantsOverview = dispatch(fetchApplicantsOverview());
    return () => {
      applicantsOverview.abort();
    };
  }, [dispatch]);

  return (
    <MiniStatsWrapper>
      <Open />
      <Active />
      <Hiring />
      <Experience />
    </MiniStatsWrapper>
  );
}
