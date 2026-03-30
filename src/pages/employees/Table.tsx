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
});

const EmployeeTable = styled("table")({
  width: "100%",
  height: "100%",
  borderCollapse: "collapse",
});

export default function Table() {
  const status = useSelector(selectAllEmployeeStatus);
  const isLoading = status === "loading";
  return (
    <TableWrapper>
      <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
        <EmployeeTable>
          <THead />
          <TBody />
        </EmployeeTable>
      </WithSkeleton>
    </TableWrapper>
  );
}
