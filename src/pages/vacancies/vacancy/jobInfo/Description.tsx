import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectVacancyStatus } from "../vacancySlice";

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "18px",
  padding: "10px",
}));

export default function Description() {
  const status = useSelector(selectVacancyStatus);
  return (
    <WithSkeleton loading={status === "loading"}>
      <DescriptionWrapper>Description</DescriptionWrapper>
    </WithSkeleton>
  );
}
