import { Box, IconButton, styled } from "@mui/material";
import React, { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../config/store";
import { fetchDetails } from "./detailSlice";
import Headline from "./Headline";
import Skills from "./Skills";
import Professional from "./Professional";
import Personal from "./Personal";
import Education from "./Education";
import CloseIcon from "@mui/icons-material/Close";
import useFocusTrap from "../../../../shared/lib/useFocusTrap";

interface DetailsProps {
  id: number;
  setActiveApplicant: React.Dispatch<React.SetStateAction<number>>;
}

const DetailsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  scrollbarWidth: "none",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const CloseWrapper = styled(IconButton)({
  height: "40px",
  width: "40px",
  marginLeft: "auto",
});

const Core = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
});

const User = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flex: 1,
  minWidth: "300px",
});

const Details = memo(({ id, setActiveApplicant }: DetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(detailsRef);

  useEffect(() => {
    const detailRequest = dispatch(fetchDetails({ id }));
    return () => {
      detailRequest.abort();
    };
  }, [dispatch, id]);

  return (
    <DetailsWrapper ref={detailsRef}>
      <CloseWrapper
        onClick={() => setActiveApplicant(-1)}
        aria-label="Close Menu"
      >
        <CloseIcon fontSize="small" />
      </CloseWrapper>
      <Headline />
      <Core>
        <User>
          <Personal />
          <Education />
        </User>
        <Professional />
      </Core>
      <Skills />
    </DetailsWrapper>
  );
});

export default Details;
