import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplicantsOverview,
  selectApplicantOverviewError,
  selectApplicantOverviewOpen,
  selectApplicantOverviewStatus,
} from "./applicantOverview";
import Bar from "./Bar";
import Overview from "./Overview";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import type { AppDispatch } from "../../../config/store";
import Reload from "../../../shared/ui/Reload";

const OpenWrapper = styled(Box)(({ theme }) => ({
  width: "275px",
  aspectRatio: "2.3/1",
  display: "flex",
  gap: "5px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  overflow: "hidden",
}));

export default function Open() {
  const openStats = useSelector(selectApplicantOverviewOpen);
  const status = useSelector(selectApplicantOverviewStatus);
  const error = useSelector(selectApplicantOverviewError);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <OpenWrapper>
      <WithSkeleton loading={status === "loading"}>
        {status === "success" && (
          <>
            <Bar
              name="open"
              trend={openStats?.trend ?? []}
              barColor={"first"}
            />
            <Overview
              total={openStats?.total ?? 0}
              name="open"
              special={openStats?.new ?? 0}
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
    </OpenWrapper>
  );
}
