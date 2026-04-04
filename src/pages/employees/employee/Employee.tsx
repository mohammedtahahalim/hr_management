import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import {
  editEmployee,
  fetchEmployee,
  selectEmployeeError,
  selectEmployeeStatus,
  type EmployeeEditableFields,
} from "./employeeSlice";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Snippet from "./profile/Snippet";
import Personal from "./profile/Personal";
import Skills from "./profile/Skills";
import Project from "./projects/Project";
import Bank from "./compensation/Bank";
import Salary from "./compensation/Salary";
import Education from "./career/Education";
import Experience from "./career/Experience";
import Document from "./career/Document";
import { useForm } from "react-hook-form";
import { EmployeeFormContext } from "./EmployeeFormContext";

const EmployeeWrapper = styled(Box)({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  height: "fit-content",
});

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "75px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    height: "100px",
  },
}));

const MainContent = styled("form")({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
  height: "fit-content",
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
  maxHeight: "250px",
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
  minWidth: "325px",
  flex: "1",
  overflow: "hidden",
  minHeight: "250px",
});

const Tall = styled(Box)({
  minWidth: "325px",
  flex: "2",
  borderRadius: "12px",
  padding: "5px",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
  minHeight: "450px",
  maxHeight: "750px",
});

export default function Employee() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectEmployeeStatus);
  const isLoading = status === "loading";
  const error = useSelector(selectEmployeeError);
  const { register, handleSubmit } = useForm<EmployeeEditableFields>();

  const EditEmployee = handleSubmit((formValues: EmployeeEditableFields) => {
    console.log(formValues);
    dispatch(editEmployee(formValues));
  });

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
          <Headline handleEdit={EditEmployee} />
        </WithSkeleton>
      </HeadlineWrapper>
      <MainContent id="employee-details" name="employee-details">
        <EmployeeFormContext.Provider value={register}>
          <LeftSection>
            <LTop>
              <Block>
                <Snippet />
              </Block>
              <Block>
                <Personal />
              </Block>
            </LTop>
            <LMiddle>
              <Block>
                <Skills />
              </Block>
            </LMiddle>
            <LBottom>
              <Project />
            </LBottom>
          </LeftSection>
          <RightSection>
            <RLeftColumn>
              <Block>
                <Bank />
              </Block>
              <Block>
                <Salary />
              </Block>
              <Block>
                <Education />
              </Block>
            </RLeftColumn>
            <RRightColumn>
              <Tall>
                <Experience />
              </Tall>
              <Block>
                <Document />
              </Block>
            </RRightColumn>
          </RightSection>
        </EmployeeFormContext.Provider>
      </MainContent>
    </EmployeeWrapper>
  );
}
