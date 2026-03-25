import { Box, styled } from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../config/store";
import { fetchDetails } from "./detailSlice";

interface DetailsProps {
  id: number;
}

const DetailsWrapper = styled(Box)({
  width: "100%",
  height: "200vh",
  padding: "12px",
});

const Details = memo(({ id }: DetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const detailRequest = dispatch(fetchDetails({ id }));
    return () => {
      detailRequest.abort();
    };
  }, [dispatch]);

  return <DetailsWrapper>{id}</DetailsWrapper>;
});

export default Details;
