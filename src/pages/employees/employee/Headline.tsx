import { Box, styled } from "@mui/material";

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "5px",
  },
}));

export default function Headline() {
  return <HeadlineWrapper>Headline</HeadlineWrapper>;
}
