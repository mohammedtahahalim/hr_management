import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectVacancieData } from "../vacancieSlice";
import Card from "./Card";

const CardsWrapper = styled(Box)({
  width: "fit-content",
  flex: 1,
  display: "flex",
  gap: "5px",
  alignContent: "flex-start",
  flexWrap: "wrap",
  justifyContent: "center",
});

export default function Cards() {
  const data = useSelector(selectVacancieData);
  return (
    <CardsWrapper>
      {data.map((d) => {
        return <Card key={d.id} {...d} />;
      })}
    </CardsWrapper>
  );
}
