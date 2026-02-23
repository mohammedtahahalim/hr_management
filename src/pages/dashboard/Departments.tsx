import { Box, styled } from "@mui/material";

const DepartmentsWrapper = styled(Box)({
  flex: 1.5,
  display: "flex",
  border: "1px solid black",
  minHeight: "200px",
});

export default function Departments() {
  return <DepartmentsWrapper>Departments</DepartmentsWrapper>;
}
