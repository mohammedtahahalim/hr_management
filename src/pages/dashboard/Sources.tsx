import { Box, styled } from "@mui/material";

const SourcesWrapper = styled(Box)({
  flex: 1.5,
  display: "flex",
  border: "1px solid black",
  minHeight: "300px",
});

export default function Sources() {
  return <SourcesWrapper>Sources</SourcesWrapper>;
}
