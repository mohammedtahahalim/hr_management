import { styled } from "@mui/material";

const JobRowWrapper = styled("tr")({});

const Col = styled("td")(({ theme }) => ({
  maxWidth: "100px",
  padding: "5px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    "&:nth-of-type(2)": {
      display: "none",
    },
  },
}));

export default function JobRow() {
  return (
    <JobRowWrapper>
      <Col>Job Title</Col>
      <Col>Location</Col>
      <Col>Applicants</Col>
      <Col>Chart</Col>
    </JobRowWrapper>
  );
}
