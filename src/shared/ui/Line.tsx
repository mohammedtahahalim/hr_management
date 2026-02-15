import { Box, styled } from "@mui/material";
import type { CSSProperties } from "react";

interface LineProps {
  dir: "v" | "h";
  w: CSSProperties["width"];
  h: CSSProperties["height"];
}

const LineWrapper = styled(Box)<LineProps>(({ dir, w, h, theme }) => ({
  width: dir === "v" ? "2px" : w,
  height: dir === "v" ? h : "2px",
  backgroundColor: theme.palette.divider,
}));

export default function Line({ dir, h, w }: LineProps) {
  return <LineWrapper dir={dir} h={h} w={w} />;
}
