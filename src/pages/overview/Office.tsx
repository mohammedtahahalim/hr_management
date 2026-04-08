import { Box, styled } from "@mui/material";

const OfficeWrapper = styled(Box)({
  flex: 1,
  minWidth: "350px",
  border: "1px solid white",
});

export default function Office() {
  return <OfficeWrapper>Office</OfficeWrapper>;
}
