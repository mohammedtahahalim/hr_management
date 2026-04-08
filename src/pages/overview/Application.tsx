import { Box, styled } from "@mui/material";

const ApplicationWrapper = styled(Box)({
  flex: 2,
  border: "1px solid white",
  minWidth: "350px",
});

export default function Application() {
  return <ApplicationWrapper>Application</ApplicationWrapper>;
}
