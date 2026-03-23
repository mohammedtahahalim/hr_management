import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import MiniStats from "./miniStats/MiniStats";
import Table from "./table/Table";

const ApplicantsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TableWrapper = styled(Box)({
  width: "100%",
  border: "1px solid black",
  flex: 1,
});

export default function Applicants() {
  return (
    <ApplicantsWrapper>
      <Headline />
      <MiniStats />
      <TableWrapper>
        <Table />
      </TableWrapper>
    </ApplicantsWrapper>
  );
}
