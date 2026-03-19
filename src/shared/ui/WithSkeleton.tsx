import { Skeleton, styled, type SxProps } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

interface OnSkeletonProps {
  loading: boolean;
  children: React.ReactNode;
  sx?: SxProps;
}

const SkeletonLoader = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: `${theme.palette.divider} !important`,
}));

const MotionSkeleton = motion.create(SkeletonLoader);

export default function WithSkeleton({
  loading,
  children,
  sx = {},
}: OnSkeletonProps) {
  return (
    <AnimatePresence>
      {loading ? <MotionSkeleton variant="rectangular" sx={sx} /> : children}
    </AnimatePresence>
  );
}
