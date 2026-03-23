import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectApplicantOverviewOpen,
  selectApplicantOverviewStatus,
} from "./applicantOverview";
import Bar from "./Bar";
import Overview from "./Overview";
import WithSkeleton from "../../../shared/ui/WithSkeleton";

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

  return (
    <OpenWrapper>
      <WithSkeleton loading={status === "loading"}>
        <>
          <Bar name="open" trend={openStats?.trend ?? []} barColor={"first"} />
          <Overview
            total={openStats?.total ?? 0}
            name="open"
            special={openStats?.new ?? 0}
          />
        </>
      </WithSkeleton>
    </OpenWrapper>
  );
}
