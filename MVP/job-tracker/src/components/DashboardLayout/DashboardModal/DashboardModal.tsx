import { Modal } from "@/components/Modal";
import { Button } from "@/ui/Button";
import IconClose from "@assets/svg/icon-close.svg?react";
import type { DashboardModalProps } from "./types";
import { DashboardFormModal } from "./DashboardFormModal";

export function DashboardModal({
  isOpenModal,
  modalRef,
  handleSubmit,
  handleSubmitEditFormDashboard,
  errorDataBase,
  errors,
  register,
  handleCloseModal,
}: DashboardModalProps) {
  return (
    <Modal isOpen={!!isOpenModal} modalRef={modalRef}>
      <DashboardFormModal
        handleSubmit={handleSubmit}
        handleSubmitEditFormDashboard={handleSubmitEditFormDashboard}
        errorDataBase={errorDataBase}
        errors={errors}
        register={register}
      />
      <Button
        size="icon"
        variant="icon"
        type="button"
        className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        handleClickButton={handleCloseModal}
      >
        <IconClose className="w-5 h-5" />
      </Button>
    </Modal>
  );
}
