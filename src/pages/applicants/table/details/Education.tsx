import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDetailStatus } from "./detailSlice";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";

const EducationWrapper = styled(Box)(({ theme }) => ({
  minHeight: "300px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  padding: "5px",
}));

export default function Education() {
  const status = useSelector(selectDetailStatus);
  return (
    <EducationWrapper>
      <WithSkeleton
        loading={status === "loading"}
        sx={{ borderRadius: "12px" }}
      >
        <div>Education</div>
      </WithSkeleton>
    </EducationWrapper>
  );
}
