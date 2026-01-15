import clsx from "clsx";
import type { ModalProps } from "./types";
import { AnimatedContainer } from "@/shared/ui/AnimatedContainer";
import { useEffect } from "react";

export function Modal({
  isOpen,
  modalRef,
  children,
  errorDataBase,
  successOperation,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex flex-col z-15 bg-[var(--color-black-05)] px-4 py-4">
      <AnimatedContainer className=" flex flex-col items-center justify-center flex-grow">
        <div
          ref={modalRef}
          className={clsx(
            "bg-white border p-6 rounded-lg shadow-lg w-full max-w-md relative  max-h-[94vh] overflow-y-auto",
            errorDataBase
              ? "border-[var(--color-danger)]"
              : successOperation
              ? "border-[var(--color-success)]"
              : "border-transparent"
          )}
        >
          {children}
        </div>
      </AnimatedContainer>
    </div>
  );
}
