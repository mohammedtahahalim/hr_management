import { useSelector } from "react-redux";
import { selectApplicantStatus } from "./applicantSlice";
import { styled } from "@mui/material";
import Head from "./Head";
import Body from "./Body";
import WithSkeleton from "../../../shared/ui/WithSkeleton";

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

  return (
    <WithSkeleton loading={status === "loading"} sx={{ borderRadius: "25px" }}>
      <TableWrapper>
        <Head />
        <Body />
      </TableWrapper>
    </WithSkeleton>
  );
}
