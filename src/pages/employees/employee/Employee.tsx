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
  gap: "5px",
  flexWrap: "wrap",
});

const LeftSection = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const LTop = styled(Box)({
  flex: 1,
  width: "100%",
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
});

const LMiddle = styled(Box)({
  flex: 1,
  width: "100%",
});

const LBottom = styled(Box)({
  flex: 1,
  width: "100%",
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
});

const RightSection = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
});

const RLeftColumn = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const RRightColumn = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const Block = styled(Box)({
  minWidth: "300px",
  border: "1px solid crimson",
  flex: "1",
  minHeight: "250px",
  borderRadius: "12px",
  padding: "5px",
  overflow: "hidden",
});

const Tall = styled(Box)({
  minWidth: "300px",
  border: "1px solid crimson",
  flex: "2",
  borderRadius: "12px",
  padding: "5px",
  overflow: "hidden",
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
      <MainContent>
        <LeftSection>
          <LTop>
            <Block>Name</Block>
            <Block>Personal</Block>
          </LTop>
          <LMiddle>
            <Block>Skills</Block>
          </LMiddle>
          <LBottom>
            <Block>Project 1</Block>
            <Block>Project 2</Block>
          </LBottom>
        </LeftSection>
        <RightSection>
          <RLeftColumn>
            <Block>Bank</Block>
            <Block>Salary</Block>
            <Block>Education</Block>
          </RLeftColumn>
          <RRightColumn>
            <Tall>Experience</Tall>
            <Block>Documents</Block>
          </RRightColumn>
        </RightSection>
      </MainContent>
    </EmployeeWrapper>
  );
}
