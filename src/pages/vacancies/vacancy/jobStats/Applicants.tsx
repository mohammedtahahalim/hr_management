import { Box, styled } from "@mui/material";

const ApplicantsWrapper = styled(Box)({
  flex: 1.5,
  minWidth: "350px",
  border: "1px solid white",
});

export default function Applicants() {
  return <ApplicantsWrapper>Applicants</ApplicantsWrapper>;
}
