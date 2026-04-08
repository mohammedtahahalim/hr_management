import { Box, styled } from "@mui/material";

const ProjectWrapper = styled(Box)({
  minWidth: "350px",
  flex: 1,
  border: "1px solid white",
});

export default function Project() {
  return <ProjectWrapper>Project</ProjectWrapper>;
}
