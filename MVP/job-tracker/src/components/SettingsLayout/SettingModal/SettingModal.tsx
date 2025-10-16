import { Modal } from "@/components/Modal";
import { ButtonUi } from "@/ui/ButtonUi";
import IconClose from "@assets/svg/icon-close.svg?react";
import type { SettingModalProps } from "./types";

export function SettingModal({
  isOpen,
  modalRef,
  getStatusModalSetting,
  modalAppeareName,
  handleDeleteProfile,
  closeModal,
  setModalAppeareName,
}: SettingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      modalRef={modalRef}
      errorDataBase={
        modalAppeareName === "errorDeleteProfile" ||
        modalAppeareName === "errorEdit"
          ? "error"
          : ""
      }
      successOperation={
        modalAppeareName === "successDeleteProfile" ||
        modalAppeareName === "successEdit"
      }
    >
      <div className="flex flex-col gap-3">
        {getStatusModalSetting(modalAppeareName)}
        {modalAppeareName === "confirmDeleteProfile" && (
          <ButtonUi
            type="button"
            size="md"
            variant="exit"
            handleClickButton={handleDeleteProfile}
          >
            Delete profile
          </ButtonUi>
        )}
      </div>
      <ButtonUi
        size="icon"
        variant="icon"
        type="button"
        className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        handleClickButton={() => {
          closeModal();
          setModalAppeareName(null);
        }}
      >
        <IconClose className="w-5 h-5" />
      </ButtonUi>
    </Modal>
  );
}
