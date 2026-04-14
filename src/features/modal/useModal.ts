import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

/* ----------------------------- Focusable elements ----------------------------- */
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

interface UseModalProps {
  trapFocus?: boolean;
  preventScroll?: boolean;
}

interface UseModalReturns<T extends HTMLElement, M extends HTMLElement> {
  openModal: () => void;
  closeModal: () => void;
  modalRef: RefObject<M | null>;
  triggerRef: RefObject<T | null>;
  isOpen: boolean;
}

export default function useModal<T extends HTMLElement, M extends HTMLElement>(
  props?: UseModalProps,
): UseModalReturns<T, M> {
  const { trapFocus = true, preventScroll = true } = props ?? {};
  const triggerRef = useRef<T | null>(null);
  const modalRef = useRef<M | null>(null);
  const lastActiveElement = useRef<Element | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    if (!modalRef.current || !triggerRef.current) return;
    const modal = modalRef.current;
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeModal();
    };

    /* ----------------------------- Saving previous overflow to prevent scrolling when modal open ----------------------------- */
    const previousOverflow = document.body.style.overflow;
    if (preventScroll) {
      document.body.style.overflow = "hidden";
    }

    /* ----------------------------- Saving last active element ----------------------------- */
    lastActiveElement.current = document.activeElement;
    const focusables = Array.from(
      modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter(
      (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
    );

    /* ----------------------------- First element focus ----------------------------- */
    focusables[0]?.focus();

    /* ----------------------------- Focus trap ----------------------------- */
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !trapFocus) return;
      if (focusables.length < 2) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !modal.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
        return;
      }
    };

    /* ----------------------------- Events ----------------------------- */
    modal.addEventListener("keydown", handleFocusTrap);
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      /* ----------------------------- Cleanup ----------------------------- */
      modal.removeEventListener("keydown", handleFocusTrap);
      window.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = previousOverflow;
      if (lastActiveElement.current instanceof HTMLElement) {
        lastActiveElement.current!.focus();
      }
    };
  }, [isOpen, trapFocus, closeModal, preventScroll]);

  return { openModal, closeModal, modalRef, triggerRef, isOpen };
}
