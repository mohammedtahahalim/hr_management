import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectVacancieData, selectVacancieStatus } from "../vacancieSlice";
import Card from "./Card";
import WithSkeleton from "../../../shared/ui/WithSkeleton";

const CardsWrapper = styled(Box)({
  width: "fit-content",
  flex: 1,
  display: "flex",
  gap: "10px",
  alignContent: "flex-start",
  flexWrap: "wrap",
  justifyContent: "center",
});

export default function Cards() {
  const data = useSelector(selectVacancieData);
  const status = useSelector(selectVacancieStatus);
  return (
    <WithSkeleton loading={status === "loading"}>
      <CardsWrapper>
        {data.map((d) => {
          return <Card key={d.id} {...d} />;
        })}
      </CardsWrapper>
    </WithSkeleton>
  );
}
