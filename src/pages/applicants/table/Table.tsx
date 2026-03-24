import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import { fetchApplicants } from "./applicantSlice";
import { styled } from "@mui/material";
import Head from "./Head";
import Body from "./Body";

const TableWrapper = styled("table")({
  width: "100%",
  flex: 1,
  overflowY: "scroll",
  scrollbarWidth: "none",
  borderCollapse: "separate",
  borderSpacing: "0",
});

export default function Table() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const applicantRequest = dispatch(
      fetchApplicants({ page: 1, pageSize: 8 }),
    );
    return () => {
      applicantRequest.abort();
    };
  }, [dispatch]);

  return (
    <TableWrapper>
      <Head />
      <Body />
    </TableWrapper>
  );
}
