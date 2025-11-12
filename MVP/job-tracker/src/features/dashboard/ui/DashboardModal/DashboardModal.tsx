import { Modal } from "@shared/ui/Modal";
import { ButtonUi } from "@shared/ui/ButtonUi";
import IconClose from "@shared/assets/svg/icon-close.svg?react";
import type { DashboardModalProps } from "./types";
import { DashboardFormModal } from "@features/dashboard/ui/DashboardModal/DashboardFormModal";
import { memo } from "react";

export const DashboardModal = memo(function DashboardModal({
  isOpenModal,
  modalRef,
  handleSubmit,
  handleSubmitEditFormDashboard,
  errors,
  register,
  handleCloseModal,
  newTagValue,
  setNewTagValue,
  arrayTagValue,
  handleAddTag,
  handleDeleteTag,
  isErrorAddTag,
}: DashboardModalProps) {
  return (
    <Modal isOpen={!!isOpenModal} modalRef={modalRef}>
      <DashboardFormModal
        handleSubmit={handleSubmit}
        handleSubmitEditFormDashboard={handleSubmitEditFormDashboard}
        errors={errors}
        register={register}
        isOpenModal={isOpenModal}
        newTagValue={newTagValue}
        setNewTagValue={setNewTagValue}
        arrayTagValue={arrayTagValue}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        isErrorAddTag={isErrorAddTag}
      />
      <ButtonUi
        size="icon"
        variant="icon"
        type="button"
        className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        handleClickButton={handleCloseModal}
      >
        <IconClose className="w-5 h-5" />
      </ButtonUi>
    </Modal>
  );
});
