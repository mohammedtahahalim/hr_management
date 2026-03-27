import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Bar from "./Bar";
import Overview from "./Overview";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplicantsOverview,
  selectApplicantOverviewCandidate,
  selectApplicantOverviewError,
  selectApplicantOverviewStatus,
} from "./applicantOverview";
import type { AppDispatch } from "../../../config/store";
import Reload from "../../../shared/ui/Reload";

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
  const error = useSelector(selectApplicantOverviewError);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ExperienceWrapper>
      <WithSkeleton loading={status === "loading"}>
        {status === "success" && (
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
        )}
        {status === "failure" && (
          <Reload
            error={error}
            dispatchThunk={() => dispatch(fetchApplicantsOverview())}
          />
        )}
      </WithSkeleton>
    </ExperienceWrapper>
  );
}
