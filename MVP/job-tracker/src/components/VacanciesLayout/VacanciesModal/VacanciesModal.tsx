import { Modal } from "@/components/Modal";
import { ButtonUi } from "@/ui/ButtonUi";
import IconClose from "@assets/svg/icon-close.svg?react";
import type { VacanciesModalProps } from "./types";

export function VacanciesModal({
  isOpen,
  modalRef,
  closeModal,
  setErrorDataBase,
  errorDataBase,
  setSuccessAddInKanban,
  successAddInKanban,
}: VacanciesModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      modalRef={modalRef}
      errorDataBase={errorDataBase}
      successOperation={successAddInKanban}
    >
      <div className="flex flex-col gap-3">
        {errorDataBase && (
          <span className="text-[var(--color-danger)]">
            Error to add vacancy in Kanban board
          </span>
        )}
        {successAddInKanban && (
          <span className="text-[var(--color-success)]">
            Add vacancy in Kanban board is success!
          </span>
        )}
      </div>
      <ButtonUi
        size="icon"
        variant="icon"
        type="button"
        className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        handleClickButton={() => {
          closeModal();
          setErrorDataBase(false);
          setSuccessAddInKanban(false);
        }}
      >
        <IconClose className="w-5 h-5" />
      </ButtonUi>
    </Modal>
  );
}
