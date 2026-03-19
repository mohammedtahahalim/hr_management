import { Box, styled } from "@mui/material";

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  flex: 2,
  minWidth: "450px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "18px",
  padding: "10px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
  },
}));

export default function Description() {
  return <DescriptionWrapper>Description</DescriptionWrapper>;
}
