import { styled } from "@mui/material";
import Row from "./Row";

const BodyWrapper = styled("tbody")({
  width: "100%",
  overflow: "hidden",
});

export default function Body() {
  return (
    <BodyWrapper>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </BodyWrapper>
  );
}
