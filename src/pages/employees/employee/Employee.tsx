import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import {
  fetchEmployee,
  selectEmployeeError,
  selectEmployeeStatus,
} from "./employeeSlice";
import WithSkeleton from "../../../shared/ui/WithSkeleton";

const EmployeeWrapper = styled(Box)({
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
  gap: "5px",
  border: "1px solid white",
});

export default function Employee() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectEmployeeStatus);
  const isLoading = status === "loading";
  const error = useSelector(selectEmployeeError);

  useEffect(() => {
    if (!id) return;
    const employeeRequest = dispatch(fetchEmployee({ id }));
    return () => {
      employeeRequest.abort();
    };
  }, [dispatch, id]);

  if (error === "BAD") return <Navigate to={"/employees"} replace />;

  return (
    <EmployeeWrapper>
      <HeadlineWrapper>
        <WithSkeleton loading={isLoading}>
          <Headline />
        </WithSkeleton>
      </HeadlineWrapper>
      <MainContent></MainContent>
    </EmployeeWrapper>
  );
}
