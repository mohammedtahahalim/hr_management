import { styled } from "@mui/material";

const HeadWrapper = styled("thead")({
  width: "100%",
});

const Row = styled("tr")(({ theme }) => ({
  "&>td:first-of-type": {
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
  },
  "&>td:last-of-type": {
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
  },
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
    "&>td:nth-of-type(4)": {
      borderTopRightRadius: "50px",
      borderBottomRightRadius: "50px",
    },
  },
}));

const Col = styled("td")(({ theme }) => ({
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  height: "50px",
}));

export default function Head() {
  return (
    <HeadWrapper>
      <Row>
        <Col>Col</Col>
        <Col>Col</Col>
        <Col>Col</Col>
        <Col>Col</Col>
        <Col>Col</Col>
        <Col>Col</Col>
      </Row>
    </HeadWrapper>
  );
}
