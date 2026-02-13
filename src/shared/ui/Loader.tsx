import { Box, CircularProgress, styled } from "@mui/material";

const LoaderWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function Loader() {
  return (
    <LoaderWrapper>
      <CircularProgress color="primary" size={"3rem"} />
    </LoaderWrapper>
  );
}
