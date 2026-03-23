import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Bar from "./Bar";
import Overview from "./Overview";
import { useSelector } from "react-redux";
import {
  selectApplicantOverviewActive,
  selectApplicantOverviewStatus,
} from "./applicantOverview";

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

  return (
    <ActiveWrapper>
      <WithSkeleton loading={status === "loading"}>
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
      </WithSkeleton>
    </ActiveWrapper>
  );
}
