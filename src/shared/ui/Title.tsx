import { styled, Typography } from "@mui/material";
import type { CSSProperties } from "react";

interface TitleProps {
  children: string;
  isColorDiff?: CSSProperties["color"];
}

const TitleWrapper = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  height: "fit-content",
  padding: "2px",
});

export default function Title({ children, isColorDiff = "" }: TitleProps) {
  return (
    <TitleWrapper variant="h6" color={isColorDiff ?? "inherit"}>
      {children} :
    </TitleWrapper>
  );
}
