import type { ModalProps } from "./types";
import { AnimatedContainer } from "@/shared/AnimatedContainer";

export function Modal({ isOpen, modalRef, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatedContainer className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-1 bg-[var(--color-black-05)]">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
      >
        {children}
      </div>
    </AnimatedContainer>
  );
}
