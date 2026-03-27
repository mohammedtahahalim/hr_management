import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Bar from "./Bar";
import Overview from "./Overview";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplicantsOverview,
  selectApplicantOverviewError,
  selectApplicantOverviewHiring,
  selectApplicantOverviewStatus,
} from "./applicantOverview";
import type { AppDispatch } from "../../../config/store";
import Reload from "../../../shared/ui/Reload";

const HiringWrapper = styled(Box)(({ theme }) => ({
  width: "275px",
  aspectRatio: "2.3/1",
  display: "flex",
  gap: "5px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  overflow: "hidden",
}));

export default function Hiring() {
  const status = useSelector(selectApplicantOverviewStatus);
  const hiringData = useSelector(selectApplicantOverviewHiring);
  const error = useSelector(selectApplicantOverviewError);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <HiringWrapper>
      <WithSkeleton loading={status === "loading"}>
        {status === "success" && (
          <>
            <Bar
              name="hiring"
              trend={hiringData?.trend ?? []}
              barColor={"third"}
            />
            <Overview
              total={hiringData?.average ?? 0}
              name="hiring"
              special={hiringData?.stages ?? 0}
            />
          </>
        )}
        {status === "failure" && (
          <Reload
            error={error}
            dispatchThunk={() => dispatch(fetchApplicantsOverview())}
          />
        )}
      </WithSkeleton>
    </HiringWrapper>
  );
}
