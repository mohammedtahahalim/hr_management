import { styled } from "@mui/material";
import Row from "./Row";
import { useSelector } from "react-redux";
import { allEmployeesDisplayData } from "./allEmployeeSlice";

const TBodyWrapper = styled("tbody")({});

export default function TBody() {
  const displayData = useSelector(allEmployeesDisplayData);
  return (
    <TBodyWrapper>
      {displayData?.map((d) => {
        return <Row {...d} key={d.id} />;
      })}
    </TBodyWrapper>
  );
}
