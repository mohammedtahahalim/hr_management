import { styled, Typography, type TypographyProps } from "@mui/material";
import type { CSSProperties } from "react";

interface TitleProps {
  children: string;
  isColorDiff?: CSSProperties["color"];
  variant?: TypographyProps["variant"];
}

const TitleWrapper = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  height: "fit-content",
  padding: "2px",
});

export default function Title({
  children,
  isColorDiff = "",
  variant = "h6",
}: TitleProps) {
  return (
    <TitleWrapper variant={variant} color={isColorDiff ?? "inherit"}>
      {children} :
    </TitleWrapper>
  );
}
