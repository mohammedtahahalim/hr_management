import type React from "react";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectOverviewStatus } from "./overviewSlice";
import type { SxProps } from "@mui/material";

interface WaitModeProps {
  children: React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}

export default function WaitMode({ children, sx }: WaitModeProps) {
  const status = useSelector(selectOverviewStatus);
  const isLoading = status === "loading";

  return (
    <WithSkeleton loading={isLoading} sx={sx}>
      {children}
    </WithSkeleton>
  );
}
