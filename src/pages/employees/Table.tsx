import { Box, styled } from "@mui/material";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectAllEmployeeStatus } from "./allEmployeeSlice";
import THead from "./THead";
import TBody from "./TBody";

const TableWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  overflow: "hidden",
  borderRadius: "10px",
});

const EmployeeTable = styled("table")({});

export default function Table() {
  const status = useSelector(selectAllEmployeeStatus);
  const isLoading = status === "loading";
  return (
    <TableWrapper>
      <WithSkeleton loading={isLoading}>
        <EmployeeTable>
          <THead />
          <TBody />
        </EmployeeTable>
      </WithSkeleton>
    </TableWrapper>
  );
}
