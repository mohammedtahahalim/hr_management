import type React from "react";
import WithSkeleton from "../../shared/ui/WithSkeleton";

interface WaitModeProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function WaitMode({ children }: WaitModeProps) {
  return <WithSkeleton loading={true}>{children}</WithSkeleton>;
}
