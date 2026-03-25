import { alpha, Box, styled } from "@mui/material";
import Row from "./Row";
import { useSelector } from "react-redux";
import { selectDisplayData } from "./applicantSlice";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import Details from "./details/Details";

const BodyWrapper = styled("tbody")({
  width: "100%",
  overflow: "hidden",
});

const DetailsWrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "0px",
  right: "0px",
  height: "100vh",
  overflowY: "scroll",
  scrollbarWidth: "none",
  width: "50vw",
  minWidth: "400px",
  zIndex: 9999,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  border: `1px solid ${theme.palette.divider}`,
  borderTopLeftRadius: "18px",
  borderBottomLeftRadius: "18px",
  overflow: "hidden",
}));

const DetailsMotion = motion.create(DetailsWrapper);

export default function Body() {
  const displayData = useSelector(selectDisplayData);
  const [activeApplicant, setActiveApplicant] = useState<number>(-1);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onEscapeKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setActiveApplicant(-1);
    };
    const onClickOutside = (e: MouseEvent) => {
      const tableBody = tableBodyRef.current;
      const details = detailsRef.current;
      if (!tableBody || !details) return;
      const target = e.target as Node;
      if (!tableBody.contains(target) && !details.contains(target)) {
        setActiveApplicant(-1);
      }
    };
    window.addEventListener("keydown", onEscapeKey);
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onEscapeKey);
      window.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <BodyWrapper ref={tableBodyRef}>
      {createPortal(
        <AnimatePresence>
          {activeApplicant !== -1 && (
            <DetailsMotion
              ref={detailsRef}
              initial={{ opacity: 0, right: "-100%" }}
              animate={{ opacity: 1, right: "0px" }}
              exit={{ opacity: 0, right: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Details id={activeApplicant} />
            </DetailsMotion>
          )}
        </AnimatePresence>,
        document.body,
      )}
      {displayData.map((d) => {
        return (
          <Row key={d.id} {...d} setActiveApplicant={setActiveApplicant} />
        );
      })}
    </BodyWrapper>
  );
}
