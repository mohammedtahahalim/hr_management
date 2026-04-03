import { Box, styled } from "@mui/material";

const Project = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "hidden",
  minWidth: "300px",
  minHeight: "300px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  padding: "10px",
}));

export default function ProjectBox() {
  return <Project>ProjectBox</Project>;
}
