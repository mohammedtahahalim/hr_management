import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import { payrollDisplayData } from "./payrollSlice";
import Row from "./Row";

const BodyWrapper = styled("tbody")({});

export default function Body() {
  const displayData = useSelector(payrollDisplayData);

  return (
    <BodyWrapper>
      {displayData.map((d) => {
        return <Row key={d.id} {...d} />;
      })}
    </BodyWrapper>
  );
}
