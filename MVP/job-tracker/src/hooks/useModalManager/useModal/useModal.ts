import { useCallback, useEffect, useRef, useState } from "react";
import type { ModalProps } from "./types";

export function useModal({ callbackErr, callbackSuccess }: ModalProps = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        closeModal();
        callbackErr?.("");
        callbackSuccess?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeModal, callbackErr, callbackSuccess]);

  return {
    isOpen,
    modalRef,
    openModal,
    closeModal,
    toggleModal,
  };
}
