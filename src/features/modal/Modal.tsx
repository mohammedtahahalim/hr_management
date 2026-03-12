import { Box, styled } from "@mui/material";
import useModal from "./useModal";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  trapFocus?: boolean;
  preventScroll?: boolean;
  duration?: number;
}

const TriggerWrapper = styled(Box)({
  display: "inline-block",
});

const ChildrenWrapper = styled(Box)({
  display: "inline-block",
  border: "1px solid black",
  zIndex: 999,
  color: "black",
});

const ChildrenMotion = motion.create(ChildrenWrapper);

const FullScreenLayer = styled(Box)({
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  zIndex: 12,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(10px)",
});

export default function Modal({
  trigger,
  children,
  trapFocus,
  preventScroll,
  duration = 0.2,
}: ModalProps) {
  const { isOpen, openModal, triggerRef, modalRef } = useModal({
    trapFocus,
    preventScroll,
  });

  return (
    <>
      <TriggerWrapper ref={triggerRef} onClick={openModal}>
        {trigger}
      </TriggerWrapper>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <FullScreenLayer>
              <ChildrenMotion
                ref={modalRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
              >
                {children}
              </ChildrenMotion>
            </FullScreenLayer>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
