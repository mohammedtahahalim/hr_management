import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import Table from "./Table";
import Control from "./Control";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import {
  fetchAllEmployees,
  selectAllEmployeeViewType,
} from "./allEmployeeSlice";
import Cards from "./Cards";

const EmployeesWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "75px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    minHeight: "100px",
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
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page") ?? "1";
  const dispatch = useDispatch<AppDispatch>();
  const listType = useSelector(selectAllEmployeeViewType);

  useEffect(() => {
    const allEmployeesRequest = dispatch(fetchAllEmployees({ page }));
    return () => allEmployeesRequest.abort();
  }, [page, dispatch]);

  return (
    <EmployeesWrapper>
      <HeadlineWrapper>
        <Headline />
      </HeadlineWrapper>
      <MainContent>
        {listType === "list" ? <Table /> : <Cards />}
        <Control />
      </MainContent>
    </EmployeesWrapper>
  );
}
