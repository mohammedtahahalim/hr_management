import { styled } from "@mui/material";
import Row from "./Row";
import { useSelector } from "react-redux";
import { selectDisplayData } from "./applicantSlice";

const BodyWrapper = styled("tbody")({
  width: "100%",
  overflow: "hidden",
});

export default function Body() {
  const displayData = useSelector(selectDisplayData);

  return (
    <BodyWrapper>
      {displayData.map((d) => {
        return <Row key={d.id} {...d} />;
      })}
    </BodyWrapper>
  );
}
