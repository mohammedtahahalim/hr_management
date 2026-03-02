import { Box, styled } from "@mui/material";

const DepartmentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid black",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

export default function Department() {
  return <DepartmentWrapper>Department</DepartmentWrapper>;
}
