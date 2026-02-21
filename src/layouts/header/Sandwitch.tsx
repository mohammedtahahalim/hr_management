import { Box, styled, alpha } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import Sidebar from "../sidebar/Sidebar";
import { useFocusTrap } from "../../shared/lib/useFocusTrap";
import { useTranslation } from "react-i18next";

const SandwitchWrapper = styled(MenuIcon)(({ theme }) => ({
  fontSize: "1.7rem",
  color: theme.palette.icon.main,
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

const SidebarWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  width: "275px",
  height: "100%",
  padding: "25px 10px",
  backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.second.main, 0.9)},${theme.palette.second.main})`,
  position: "absolute",
  top: "0",
  ...(isArabic ? { right: "0" } : { left: "0" }),
}));

const SidebarMotion = motion.create(SidebarWrapper);

export default function Sandwitch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<SVGSVGElement | null>(null);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useFocusTrap(sidebarRef, isOpen);

  useEffect(() => {
    const handleClickOutsideRef = (e: MouseEvent) => {
      if (!sidebarRef.current || !burgerRef.current) return;
      const trigger = e.target as HTMLElement;
      if (
        !burgerRef.current.contains(trigger) &&
        !sidebarRef.current.contains(trigger)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutsideRef);
    return () => {
      window.removeEventListener("click", handleClickOutsideRef);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleBurgerKeyClick = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Space") {
      setIsOpen(true);
    }
  };

  return (
    <>
      <SandwitchWrapper
        onClick={() => setIsOpen(true)}
        tabIndex={0}
        aria-label="Open Menu"
        onKeyDown={handleBurgerKeyClick}
        aria-hidden={false}
        ref={burgerRef}
      />
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <SidebarMotion
              initial={
                isArabic ? { x: 275, opacity: 0 } : { x: -275, opacity: 0 }
              }
              animate={{ x: 0, opacity: 1 }}
              exit={isArabic ? { x: 275, opacity: 0 } : { x: -275, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              ref={sidebarRef}
              isArabic={isArabic}
            >
              <Sidebar />
            </SidebarMotion>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
