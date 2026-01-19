import { useModal } from "@shared/lib/hooks/useModal";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { Social } from "@shared/ui/Social";
import { useTelegramCodeBotDB } from "@features/telegram/model/useTelegramCodeBotDB";
import { FooterModal } from "@widgets/Footer/FooterModal";
import { useAuth } from "@shared/lib/context/contexts";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { closeModal, isOpen, modalRef, openModal } = useModal();
  const [getKeyStatus, setGetKeyStatus] = useState<boolean>(false);
  const { user } = useAuth();
  const { code, clearCode, loading } = useTelegramCodeBotDB(
    user,
    getKeyStatus,
    setGetKeyStatus
  );
  const { t } = useTranslation("footer");

  function handleOpenModal() {
    setGetKeyStatus(true);
    openModal();
  }

  function handleCloseModal() {
    clearCode();
    closeModal();
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[var(--color-gray-50)] p-4 flex justify-between items-center z-10 flex-col-reverse gap-2 md:flex-row md:gap md:max-h-18">
      <span className="text-[var(--color-gray-600)] text-center">
        ©{new Date().getFullYear()} {t("copyright")}
      </span>
      {user && (
        <ButtonUi
          type="button"
          variant="tg"
          size="tg"
          handleClickButton={handleOpenModal}
        >
          @JobsTrackers_bot
        </ButtonUi>
      )}
      <Social />
      <FooterModal
        isOpen={isOpen}
        modalRef={modalRef}
        closeModal={handleCloseModal}
        code={code}
        loading={loading}
      />
    </footer>
  );
}
