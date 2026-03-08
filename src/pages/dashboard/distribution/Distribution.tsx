import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Week from "./Week";
import Stats from "./Stats";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDistributions,
  selectDistributionStatus,
} from "./distributionSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import type { AppDispatch } from "../../../config/store";
import { extractCurrentWeek } from "../../../shared/lib/helpers";
import { useTranslation } from "react-i18next";
import Title from "../../../shared/ui/Title";

const DistributionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const ControlWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "fit-content",
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const ContentWrapper = styled(Box)({
  width: "100%",
  flex: 1,
});

export default function Distribution() {
  const status = useSelector(selectDistributionStatus);
  const { search } = useLocation();
  const week = new URLSearchParams(search).get("week") ?? extractCurrentWeek();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("dashboard");

  useEffect(() => {
    const distributionRequest = dispatch(fetchDistributions({ week }));
    return () => {
      distributionRequest.abort();
    };
  }, [dispatch, week]);

  return (
    <WithSkeleton loading={status === "loading"}>
      <DistributionWrapper>
        <ControlWrapper>
          <Title>{t("distributions.title")}</Title>
          <Week />
        </ControlWrapper>
        <ContentWrapper>
          <Stats />
        </ContentWrapper>
      </DistributionWrapper>
    </WithSkeleton>
  );
}
