import { Modal } from "@shared/ui/Modal";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { Link } from "react-router-dom";
import IconClose from "@shared/assets/svg/icon-close.svg?react";
import type { FooterModalProps } from "./types";

export function FooterModal({
  isOpen,
  modalRef,
  closeModal,
  code,
  loading,
}: FooterModalProps) {
  return (
    <Modal isOpen={isOpen} modalRef={modalRef}>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">STEPS</p>
        <div className="flex flex-col gap-3">
          <span className="flex flex-col gap-1">
            <span className="flex gap-1">
              <span className="font-bold text-[var(--color-black)]">1.</span>
              <span className="font-medium text-[var(--color-gray-600)]">
                Follow the link to our TG-bot:
              </span>
            </span>
            <Link
              className="transition-colors text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] w-max"
              to={"https://t.me/JobsTrackers_bot"}
            >
              @JobsTrackers_bot
            </Link>
          </span>
          <span>
            <span className="flex gap-1">
              <span className="font-bold text-[var(--color-black)]">2.</span>
              <span className="font-medium text-[var(--color-gray-600)]">
                Send the code:
              </span>
            </span>
            {loading ? (
              <span className="text-[var(--color-gray-600)]">Loading...</span>
            ) : (
              <span className="text-[var(--color-primary)]">{code}</span>
            )}
          </span>
        </div>
      </div>
      <ButtonUi
        size="icon"
        variant="icon"
        type="button"
        className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        handleClickButton={() => {
          closeModal();
        }}
      >
        <IconClose className="w-5 h-5" />
      </ButtonUi>
    </Modal>
  );
}
