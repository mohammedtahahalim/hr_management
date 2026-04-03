import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployee,
  selectEmployeeActiveProjects,
  selectEmployeeError,
  selectEmployeeStatus,
} from "../employeeSlice";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import type { AppDispatch } from "../../../../config/store";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import Reload from "../../../../shared/ui/Reload";
import ProjectBox from "./ProjectBox";

const ProjectWrapper = styled(Box)({
  width: "100%",
  height: "fit-content",
  overflow: "hidden",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "10px",
});

export default function Project() {
  const status = useSelector(selectEmployeeStatus);
  const isLoading = status === "loading";
  const activeProjects = useSelector(selectEmployeeActiveProjects);
  const error = useSelector(selectEmployeeError);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const dispatchThunk = useCallback(() => {
    dispatch(fetchEmployee({ id: id ?? "1" }));
  }, [dispatch, id]);

  return (
    <ProjectWrapper>
      <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
        {status === "success" &&
          Array.isArray(activeProjects) &&
          activeProjects.map((p) => {
            return <ProjectBox key={p.en.projTitle} />;
          })}
        {status === "failure" && (
          <Reload error={error} dispatchThunk={dispatchThunk} />
        )}
      </WithSkeleton>
    </ProjectWrapper>
  );
}
