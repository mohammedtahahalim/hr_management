import { Box, styled } from "@mui/material";

const PersonalWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid white",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
});

export default function Personal() {
  return <PersonalWrapper>Personal</PersonalWrapper>;
}
