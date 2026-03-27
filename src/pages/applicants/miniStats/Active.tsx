import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Bar from "./Bar";
import Overview from "./Overview";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplicantsOverview,
  selectApplicantOverviewActive,
  selectApplicantOverviewError,
  selectApplicantOverviewStatus,
} from "./applicantOverview";
import type { AppDispatch } from "../../../config/store";
import Reload from "../../../shared/ui/Reload";

const ActiveWrapper = styled(Box)(({ theme }) => ({
  width: "275px",
  aspectRatio: "2.3/1",
  display: "flex",
  gap: "5px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  overflow: "hidden",
}));

export default function Active() {
  const status = useSelector(selectApplicantOverviewStatus);
  const activeData = useSelector(selectApplicantOverviewActive);
  const error = useSelector(selectApplicantOverviewError);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ActiveWrapper>
      <WithSkeleton loading={status === "loading"}>
        {status === "success" && (
          <>
            <Bar
              name="active"
              trend={activeData?.trend ?? []}
              barColor={"second"}
            />
            <Overview
              total={activeData?.total ?? 0}
              name="active"
              special={activeData?.new ?? 0}
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
    </ActiveWrapper>
  );
}
