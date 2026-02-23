import { Box, styled } from "@mui/material";

const ApplicantsWrapper = styled(Box)({
  flex: 1.25,
  display: "flex",
  border: "1px solid black",
  minHeight: "200px",
});

export default function Applicants() {
  return <ApplicantsWrapper>Applicants</ApplicantsWrapper>;
}
