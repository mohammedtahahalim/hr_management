import { Box, styled } from "@mui/material";
import { memo } from "react";

interface DetailsProps {
  id: number;
}

const DetailsWrapper = styled(Box)({
  width: "100%",
  height: "200vh",
  padding: "12px",
});

const Details = memo(({ id }: DetailsProps) => {
  return <DetailsWrapper>{id}</DetailsWrapper>;
});

export default Details;
