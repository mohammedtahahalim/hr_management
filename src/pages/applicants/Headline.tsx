import { Box, styled } from "@mui/material";
import Title from "../../shared/ui/Title";

const HeadlineWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
});

export default function Headline() {
  return (
    <HeadlineWrapper>
      <Title ender={false}>Applicants</Title>
    </HeadlineWrapper>
  );
}
