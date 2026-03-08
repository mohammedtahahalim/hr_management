import { Box, styled } from "@mui/material";
import Title from "../../../shared/ui/Title";
import WithSkeleton from "../../../shared/ui/WithSkeleton";

const ActivityWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export default function Activity() {
  return (
    <WithSkeleton loading={false}>
      <ActivityWrapper>
        <Title>News And Events</Title>
      </ActivityWrapper>
    </WithSkeleton>
  );
}
