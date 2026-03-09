import { Box, styled } from "@mui/material";

const TableWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  border: "1px solid black",
});

export default function Table() {
  return <TableWrapper>Table</TableWrapper>;
}
