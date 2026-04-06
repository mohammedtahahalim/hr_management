import { useState, useEffect, useRef } from "react";
import { getFocusableElements } from "../../shared/lib/helpers";

export default function useModalOverlay() {
  const [addMode, setAddMode] = useState<boolean>(false);
  const addSalaryRef = useRef<HTMLDivElement | null>(null);
  const addSalaryButtonRef = useRef<HTMLButtonElement | null>(null);
  const activeElement = useRef<Element | null>(null);

  useEffect(() => {
    const addSalaryDiv = addSalaryRef.current;
    const buttonRef = addSalaryButtonRef.current;

    // close the modal wrapper on click outside its container
    const detectClickOutside = (e: MouseEvent) => {
      if (!addSalaryDiv || !buttonRef) return;
      const target = e.target as Node;
      if (
        !addSalaryDiv.contains(target as Node) &&
        !buttonRef.contains(target as Node)
      )
        setAddMode(false);
    };

    // close the modal wrapper on Escape key
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

  useEffect(() => {
    const addSalaryDiv = addSalaryRef.current;
    // restoring focus when modal closes
    if (!addMode || !addSalaryDiv) {
      if (activeElement.current instanceof HTMLElement)
        activeElement.current.focus();
      return;
    }

    // trapping focus inside the modal
    activeElement.current = document.activeElement;
    const focusables = getFocusableElements(addSalaryDiv);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first.focus();
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && first === document.activeElement) {
        e.preventDefault();
        last.focus();
      }
      if (!e.shiftKey && last === document.activeElement) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("keydown", trapFocus);
    };
  }, [addMode]);

  return { addMode, setAddMode, addSalaryRef, addSalaryButtonRef };
}
