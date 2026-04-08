import { Box, styled } from "@mui/material";

const BirthdayWrapper = styled(Box)({
  minWidth: "350px",
  flex: 1,
  border: "1px solid white",
});

export default function Birthday() {
  return <BirthdayWrapper>Birthday</BirthdayWrapper>;
}
