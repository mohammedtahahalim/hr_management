import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import MiniStats from "./miniStats/MiniStats";
import Table from "./table/Table";
import Control from "./Control";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useEffect } from "react";
import { fetchApplicants } from "./table/applicantSlice";

const ApplicantsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TableWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

export default function Applicants() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page") ?? "1";
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const applicantRequest = dispatch(fetchApplicants({ page }));
    return () => {
      applicantRequest.abort();
    };
  }, [dispatch, page]);

  return (
    <ApplicantsWrapper>
      <Headline />
      <MiniStats />
      <TableWrapper>
        <Table />
        <Control />
      </TableWrapper>
    </ApplicantsWrapper>
  );
}
