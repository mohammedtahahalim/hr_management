import { Box, styled } from "@mui/material";

const ProjectWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid red",
});

export default function Project() {
  return <ProjectWrapper>Project</ProjectWrapper>;
}
