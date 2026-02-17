import {
  Box,
  styled,
  Typography,
  type AlertProps,
  type SvgIconProps,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../config/store";
import { createPortal } from "react-dom";
import { HTTPErrors, type HTTPBackendErrors } from "../../shared/lib/constants";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import { AnimatePresence, motion } from "motion/react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

interface ToastProps {
  toastPosition?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}

const iconsMap: Record<
  Exclude<AlertProps["color"], undefined>,
  React.ElementType<SvgIconProps>
> = {
  error: ErrorOutlineOutlinedIcon,
  info: InfoOutlinedIcon,
  success: CheckCircleOutlineOutlinedIcon,
  warning: WarningAmberOutlinedIcon,
};

const ToastCoordinate = (toastPosition: ToastProps["toastPosition"]) => {
  if (!toastPosition) return {};
  switch (toastPosition) {
    case "top":
      return { top: "50px", left: "50%", translate: "-50% 0%" };
    case "bottom":
      return { bottom: "50px", left: "50%", translate: "-50% 0%" };
    case "left":
      return { top: "50%", left: "50px", translate: "0% -50%" };
    case "right":
      return { right: "50px", top: "50%", translate: "0% -50%" };
    case "topLeft":
      return { top: "50px", left: "50px" };
    case "topRight":
      return { top: "50px", right: "50px" };
    case "bottomLeft":
      return { bottom: "50px", left: "50px" };
    case "bottomRight":
      return { bottom: "50px", right: "50px" };
    default:
      return { top: "50px", left: "50%", translate: "-50% 0%" };
  }
};

const ToastWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "toastPosition",
})<ToastProps>(({ toastPosition }) => ({
  position: "absolute",
  width: "fit-content",
  maxWidth: "500px",
  ...ToastCoordinate(toastPosition),
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  zIndex: 9999,
}));

const ToastItem = styled(Box)(({ theme }) => ({
  width: "100%",
  minWidth: "350px",
  height: "60px",
  borderRadius: "4px",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  gap: "2px",
  alignItems: "center",
  overflow: "hidden",
}));

const ToastIcon = styled(Box)<{
  type: Exclude<AlertProps["color"], undefined>;
}>(({ type, theme }) => ({
  height: "100%",
  paddingLeft: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "inherit",
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: "0",
    left: "0",
    width: "7px",
    height: "100%",
    backgroundColor: theme.palette[type].main,
  },
}));

const ToastContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0px 5px",
  color: "inherit",
});

const ToastTitle = styled(Typography)({
  textTransform: "capitalize",
  fontFamily: "system-ui",
  fontSize: "1rem",
  fontWeight: "bold",
});

const ToastMessage = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  fontStyle: "italic",
});

const MotionToast = motion.create(ToastItem);

export default function Toast({ toastPosition = "topRight" }: ToastProps) {
  const { items } = useSelector((state: RootState) => state.toast);
  const { i18n } = useTranslation();

  return createPortal(
    <ToastWrapper toastPosition={toastPosition}>
      <AnimatePresence>
        {items.map((item) => {
          const Icon = iconsMap[item.type];
          return (
            <MotionToast
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              role="alert"
              aria-live="assertive"
            >
              <ToastIcon type={item.type}>
                {<Icon fontSize="large" color={item.type} />}
              </ToastIcon>
              <ToastContent>
                <ToastTitle variant="h6">{item.type}</ToastTitle>
                <ToastMessage variant="subtitle1">
                  {item.message in HTTPErrors
                    ? HTTPErrors[item.message as HTTPBackendErrors][
                        i18n.language as TLanguage
                      ]
                    : item.message}
                </ToastMessage>
              </ToastContent>
            </MotionToast>
          );
        })}
      </AnimatePresence>
    </ToastWrapper>,
    document.body,
  );
}
