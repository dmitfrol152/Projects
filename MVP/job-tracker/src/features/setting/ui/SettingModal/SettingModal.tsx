import { Modal } from "@shared/ui/Modal";
import { ButtonUi } from "@shared/ui/ButtonUi";
import IconClose from "@shared/assets/svg/icon-close.svg?react";
import type { SettingModalProps } from "./types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export function SettingModal({
  isOpen,
  modalRef,
  getStatusModalSetting,
  modalAppeareName,
  handleDeleteProfile,
  closeModal,
  setModalAppeareName,
}: SettingModalProps) {
  const { t } = useTranslation("settings");

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
        <span
          className={clsx(
            modalAppeareName === "errorEdit" ||
              modalAppeareName === "errorDeleteProfile"
              ? "text-[var(--color-danger)]"
              : modalAppeareName === "successEdit" ||
                modalAppeareName === "successDeleteProfile"
              ? "text-[var(--color-success)]"
              : ""
          )}
        >
          {t(String(getStatusModalSetting(modalAppeareName)))}
        </span>

        {modalAppeareName === "confirmDeleteProfile" && (
          <ButtonUi
            type="button"
            size="md"
            variant="exit"
            handleClickButton={handleDeleteProfile}
          >
            {t("settingsButtonDeleteProfile")}
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
