import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectStatus } from "./departmentSlice";
import WithSkeleton from "../../../shared/ui/WithSkeleton";

const DepartmentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid black",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

export default function Department() {
  const status = useSelector(selectStatus);
  return (
    <WithSkeleton loading={status === "loading"}>
      <DepartmentWrapper>Department</DepartmentWrapper>
    </WithSkeleton>
  );
}
