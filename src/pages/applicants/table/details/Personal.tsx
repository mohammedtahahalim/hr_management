import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDetailStatus } from "./detailSlice";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";

const PersonalWrapper = styled(Box)(({ theme }) => ({
  minHeight: "300px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
}));

export default function Personal() {
  const status = useSelector(selectDetailStatus);
  return (
    <PersonalWrapper>
      <WithSkeleton
        loading={status === "loading"}
        sx={{ borderRadius: "12px" }}
      >
        <div>Personal</div>
      </WithSkeleton>
    </PersonalWrapper>
  );
}
