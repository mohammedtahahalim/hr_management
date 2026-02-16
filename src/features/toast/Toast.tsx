import { alpha, Box, styled, type AlertProps } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../config/store";
import { createPortal } from "react-dom";
import { HTTPErrors, type HTTPBackendErrors } from "../../shared/lib/constants";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import { AnimatePresence, motion } from "motion/react";

const ToastWrapper = styled(Box)({
  position: "absolute",
  width: "fit-content",
  maxWidth: "500px",
  top: "25px",
  left: "50%",
  translate: "-50% 0%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  zIndex: 9999,
});

const ToastItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "type",
})<{ type: AlertProps["color"] }>(({ theme, type }) => ({
  width: "100%",
  minHeight: "50px",
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette[type ?? "primary"].main, 0.9),
  color: "whitesmoke",
  display: "flex",
  alignItems: "center",
  padding: "0px 20px",
  fontFamily: "system-ui",
  fontStyle: "italic",
}));

const MotionToast = motion.create(ToastItem);

export default function Toast() {
  const { items } = useSelector((state: RootState) => state.toast);
  const { i18n } = useTranslation();

  return createPortal(
    <ToastWrapper>
      <AnimatePresence>
        {items.map((item) => {
          return (
            <MotionToast
              key={item.id}
              type={item.type}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {item.message in HTTPErrors
                ? HTTPErrors[item.message as HTTPBackendErrors][
                    i18n.language as TLanguage
                  ]
                : item.message}
            </MotionToast>
          );
        })}
      </AnimatePresence>
    </ToastWrapper>,
    document.body,
  );
}
