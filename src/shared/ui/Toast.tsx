import { createPortal } from "react-dom";
import { Box, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ToastProps {
  type?: string;
  message: string;
}

const ToastWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "type" && prop !== "renderAmount",
})<{ type: string; renderAmount: number }>(({ theme, type, renderAmount }) => ({
  position: "absolute",
  top: `${10 * (renderAmount - 1)}px`,
  left: "50%",
  translate: "-50% 0%",
  minWidth: "300px",
  minHeight: "50px",
  border: "2px solid brown",
  borderRadius: "12px",
  zIndex: 9999,
  backgroundColor: theme.palette[type].main,
}));

const ToastMotion = motion.create(ToastWrapper);

const ToastMessage = styled(Typography)({});

let i: number = 0;

export default function Toast({ type = "error", message }: ToastProps) {
  const [isOn, setIsOn] = useState<boolean>(true);
  i++;

  useEffect(() => {
    if (isOn) {
      setTimeout(() => {
        setIsOn(false);
      }, 5000);
    }
    return () => {
      i--;
    };
  }, [isOn]);

  return createPortal(
    <AnimatePresence>
      {isOn && (
        <ToastMotion
          type={type}
          initial={{ opacity: "0" }}
          animate={{ opacity: "1" }}
          exit={{ opacity: "0" }}
          transition={{ duration: 100, ease: "easeInOut" }}
          renderAmount={i}
        >
          <ToastMessage variant="h6">{message}</ToastMessage>
        </ToastMotion>
      )}
    </AnimatePresence>,
    document.body,
  );
}
