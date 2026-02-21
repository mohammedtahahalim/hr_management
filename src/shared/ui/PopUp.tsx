import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface PopUpProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const TriggerWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ChildrenWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 5px)",
  right: "0",
  minWidth: "200px",
  minHeight: "100px",
  border: "1px solid black",
  [theme.breakpoints.down("sm")]: {
    right: "-50%",
  },
}));

const MotionWrapper = motion.create(ChildrenWrapper);

export default function PopUp({ trigger, children }: PopUpProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!triggerRef.current || !childrenRef.current) return;
      const target = e.target as HTMLElement;
      if (
        !triggerRef.current.contains(target) &&
        !childrenRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <TriggerWrapper ref={triggerRef} onClick={() => setIsOpen(true)}>
        {trigger}
        <AnimatePresence>
          {isOpen && (
            <MotionWrapper
              ref={childrenRef}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </MotionWrapper>
          )}
        </AnimatePresence>
      </TriggerWrapper>
    </>
  );
}
