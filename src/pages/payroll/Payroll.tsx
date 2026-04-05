import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import Table from "./Table";

const PayrollWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export default function Payroll() {
  return (
    <PayrollWrapper>
      <Headline />
      <Table />
    </PayrollWrapper>
  );
}
