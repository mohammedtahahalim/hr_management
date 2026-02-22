import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "../lib/useFocusTrap";

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
  [theme.breakpoints.down("sm")]: {
    right: "-50%",
  },
}));

const MotionWrapper = motion.create(ChildrenWrapper);

export default function PopUp({ trigger, children }: PopUpProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(triggerRef, isOpen);

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
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleKeyOpen = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") setIsOpen(true);
  };

  return (
    <>
      <TriggerWrapper
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyOpen}
        tabIndex={0}
      >
        {trigger}
        <AnimatePresence>
          {isOpen && (
            <MotionWrapper
              ref={childrenRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              aria-haspopup={isOpen}
            >
              {children}
            </MotionWrapper>
          )}
        </AnimatePresence>
      </TriggerWrapper>
    </>
  );
}
