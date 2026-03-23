import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Bar from "./Bar";
import Overview from "./Overview";
import { useSelector } from "react-redux";
import {
  selectApplicantOverviewCandidate,
  selectApplicantOverviewStatus,
} from "./applicantOverview";

const ExperienceWrapper = styled(Box)(({ theme }) => ({
  width: "275px",
  aspectRatio: "2.3/1",
  display: "flex",
  gap: "5px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  overflow: "hidden",
}));

export default function Experience() {
  const status = useSelector(selectApplicantOverviewStatus);
  const experienceData = useSelector(selectApplicantOverviewCandidate);

  return (
    <ExperienceWrapper>
      <WithSkeleton loading={status === "loading"}>
        <>
          <Bar
            name="experience"
            trend={experienceData?.trend ?? []}
            barColor={"fourth"}
          />
          <Overview
            total={experienceData?.average ?? 0}
            name="experience"
            special={experienceData?.percentage ?? 0}
          />
        </>
      </WithSkeleton>
    </ExperienceWrapper>
  );
}
