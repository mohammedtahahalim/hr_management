import { styled, Typography } from "@mui/material";

interface TitleProps {
  children: string;
}

const TitleWrapper = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  height: "fit-content",
  padding: "2px",
});

export default function Title({ children }: TitleProps) {
  return <TitleWrapper variant="h6">{children} :</TitleWrapper>;
}
