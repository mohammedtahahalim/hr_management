import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplicants,
  selectApplicantError,
  selectApplicantStatus,
} from "./applicantSlice";
import { styled } from "@mui/material";
import Head from "./Head";
import Body from "./Body";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import type { AppDispatch } from "../../../config/store";
import Reload from "../../../shared/ui/Reload";
import { useLocation } from "react-router-dom";

const TableWrapper = styled("table")({
  width: "100%",
  flex: 1,
  overflowY: "scroll",
  scrollbarWidth: "none",
  borderCollapse: "separate",
  borderSpacing: "0",
});

export default function Table() {
  const status = useSelector(selectApplicantStatus);
  const error = useSelector(selectApplicantError);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page") ?? "1";
  const dispatch = useDispatch<AppDispatch>();

  return (
    <WithSkeleton loading={status === "loading"} sx={{ borderRadius: "25px" }}>
      {status === "success" && (
        <TableWrapper>
          <Head />
          <Body />
        </TableWrapper>
      )}
      {status === "failure" && (
        <Reload
          error={error}
          dispatchThunk={() => dispatch(fetchApplicants({ page }))}
        />
      )}
    </WithSkeleton>
  );
}
