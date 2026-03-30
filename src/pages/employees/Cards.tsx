import { Box, styled, Typography } from "@mui/material";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectAllEmployeeStatus } from "./allEmployeeSlice";

const CardsWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  overflow: "hidden",
  borderRadius: "10px",
});

export default function Cards() {
  const status = useSelector(selectAllEmployeeStatus);
  const isLoading = status === "loading";

  return (
    <CardsWrapper>
      <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
        <Typography>Cards</Typography>
      </WithSkeleton>
    </CardsWrapper>
  );
}
