import { styled, Typography, type TypographyProps } from "@mui/material";
import type { CSSProperties } from "react";

interface TitleProps {
  children?: string;
  isColorDiff?: CSSProperties["color"];
  variant?: TypographyProps["variant"];
  ender?: boolean;
}

const TitleWrapper = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  height: "fit-content",
  padding: "2px",
});

export default function Title({
  children = "",
  isColorDiff = "",
  variant = "h6",
  ender = true,
}: TitleProps) {
  return (
    <TitleWrapper variant={variant} color={isColorDiff ?? "inherit"}>
      {children} {ender ? ":" : ""}
    </TitleWrapper>
  );
}
