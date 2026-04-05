import { styled } from "@mui/material";
import Head from "./Head";
import Body from "./Body";

const TableWrapper = styled("table")({
  flex: 1,
  border: "1px solid white",
});

export default function Table() {
  return (
    <TableWrapper>
      <Head />
      <Body />
    </TableWrapper>
  );
}
