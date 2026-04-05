import { Box, Button, styled } from "@mui/material";
import Title from "../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import AddSalary from "./AddSalary";

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  minHeight: "75px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "5px",
    minHeight: "100px",
  },
}));

const AddSalaryButton = styled(Button)({
  borderRadius: "50px",
  textTransform: "capitalize",
  fontFamily: "system-ui",
});

const AddSalaryWrapper = styled(Box)({
  width: "fit-content",
  minWidth: "50vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  right: 0,
});

const AddSalaryMotion = motion.create(AddSalaryWrapper);

export default function Headline() {
  const { t } = useTranslation("payroll");
  const [addMode, setAddMode] = useState<boolean>(false);
  const addSalaryRef = useRef<HTMLDivElement | null>(null);
  const addSalaryButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const addSalaryDiv = addSalaryRef.current;
    const buttonRef = addSalaryButtonRef.current;
    if (!addSalaryDiv || !buttonRef) return;
    const detectClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !addSalaryDiv.contains(target as Node) &&
        !buttonRef.contains(target as Node)
      )
        setAddMode(false);
    };
    const onEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAddMode(false);
      }
    };
    window.addEventListener("click", detectClickOutside);
    window.addEventListener("keydown", onEscapeKey);
    return () => {
      window.removeEventListener("click", detectClickOutside);
      window.removeEventListener("keydown", onEscapeKey);
    };
  }, [addMode]);

  return (
    <HeadlineWrapper>
      <Title ender={false}>{t("headline.title")}</Title>
      <AddSalaryButton
        variant="contained"
        startIcon={<AddIcon fontSize="small" />}
        onClick={() => setAddMode(true)}
        ref={addSalaryButtonRef}
      >
        {t("headline.addSalary")}
      </AddSalaryButton>
      {createPortal(
        <AnimatePresence>
          {addMode && (
            <AddSalaryMotion
              initial={{ right: "-50vw", opacity: 0 }}
              animate={{ right: 0, opacity: 1 }}
              exit={{ right: "-50vw", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              ref={addSalaryRef}
            >
              <AddSalary />
            </AddSalaryMotion>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </HeadlineWrapper>
  );
}
