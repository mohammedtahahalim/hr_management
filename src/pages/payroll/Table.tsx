import { styled } from "@mui/material";
import Head from "./Head";
import Body from "./Body";
import WaitPayroll from "./WaitPayroll";

const TableWrapper = styled("table")({
  borderCollapse: "collapse",
  width: "100%",
  flex: 1,
});

export default function Table() {
  return (
    <WaitPayroll>
      <TableWrapper>
        <Head />
        <Body />
      </TableWrapper>
    </WaitPayroll>
  );
}
