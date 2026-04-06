import { styled } from "@mui/material";
import Head from "./Head";
import Body from "./Body";

const TableWrapper = styled("table")({
  borderCollapse: "collapse",
  width: "100%",
  flex: 1,
});

export default function Table() {
  return (
    <TableWrapper>
      <Head />
      <Body />
    </TableWrapper>
  );
}
