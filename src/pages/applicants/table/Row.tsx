import { styled } from "@mui/material";

const RowWrapper = styled("tr")(({ theme }) => ({
  height: "45px",

  [theme.breakpoints.down("lg")]: {
    "&>td:nth-of-type(3)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&>td:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&>td:nth-of-type(6)": {
      display: "none",
    },
  },
}));

const Col = styled("td")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: "50px",
}));

export default function Row() {
  return (
    <RowWrapper>
      <Col />
      <Col />
      <Col />
      <Col />
      <Col />
      <Col />
    </RowWrapper>
  );
}
