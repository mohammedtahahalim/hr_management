import { Box, styled } from "@mui/material";

const StatusWrapper = styled(Box)({
  flex: 1,
  minHeight: "200px",
  padding: "10px",
});

export default function Status() {
  return <StatusWrapper>Status</StatusWrapper>;
}
