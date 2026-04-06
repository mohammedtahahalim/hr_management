import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import Table from "./Table";
import Pagination from "./Pagination";
import Pagesize from "./Pagesize";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useEffect } from "react";
import { fetchPayrolls } from "./payrollSlice";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

const PayrollWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

const Control = styled(Box)({
  width: "100%",
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
});

export default function Payroll() {
  const [searchParams, _] = useSearchParams();
  const page = Number(searchParams.get("page") ?? DEFAULT_PAGE);
  const pageSize = Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const payrollRequest = dispatch(fetchPayrolls({ page, pageSize }));
    return () => {
      payrollRequest.abort();
    };
  }, [dispatch, page, pageSize]);

  return (
    <PayrollWrapper>
      <Headline />
      <Table />
      <Control>
        <Pagination />
        <Pagesize />
      </Control>
    </PayrollWrapper>
  );
}
