import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import Table from "./Table";
import Control from "./Control";

const EmployeesWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid white",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "75px",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    minHeight: "150px",
  },
}));

const MainContent = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export default function Employees() {
  return (
    <EmployeesWrapper>
      <HeadlineWrapper>
        <Headline />
      </HeadlineWrapper>
      <MainContent>
        <Table />
        <Control />
      </MainContent>
    </EmployeesWrapper>
  );
}
