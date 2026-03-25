import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectDetailStatus } from "./detailSlice";

const ProfessionalWrapper = styled(Box)({
  flex: 1,
  minWidth: "300px",
  padding: "5px",
});

export default function Professional() {
  const status = useSelector(selectDetailStatus);
  return (
    <ProfessionalWrapper>
      <WithSkeleton loading={status === "loading"}>
        <div>Professional</div>
      </WithSkeleton>
    </ProfessionalWrapper>
  );
}
