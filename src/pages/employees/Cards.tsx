import { Box, styled } from "@mui/material";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import {
  allEmployeesDisplayData,
  selectAllEmployeeStatus,
} from "./allEmployeeSlice";
import Card from "./Card";

const CardsWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  overflow: "hidden",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
});

export default function Cards() {
  const status = useSelector(selectAllEmployeeStatus);
  const isLoading = status === "loading";
  const displayData = useSelector(allEmployeesDisplayData);

  return (
    <CardsWrapper>
      <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
        {displayData.map((d) => {
          return <Card key={d.id} {...d} />;
        })}
      </WithSkeleton>
    </CardsWrapper>
  );
}
