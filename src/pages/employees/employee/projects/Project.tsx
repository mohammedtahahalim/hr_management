import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectEmployeeActiveProjects } from "../employeeSlice";
import ProjectBox from "./ProjectBox";
import WaitEmployeeMode from "../WaitEmployeeMode";

const ProjectWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "10px",
});

export default function Project() {
  const activeProjects = useSelector(selectEmployeeActiveProjects);

  return (
    <ProjectWrapper>
      <WaitEmployeeMode>
        {Array.isArray(activeProjects) &&
          activeProjects.map((p) => {
            return <ProjectBox key={p.en.projTitle} p={p} />;
          })}
      </WaitEmployeeMode>
    </ProjectWrapper>
  );
}
