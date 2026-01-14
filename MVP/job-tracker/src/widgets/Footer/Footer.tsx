import { useModal } from "@shared/lib/hooks/useModal";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { Social } from "@shared/ui/Social";
import { useTelegramCodeBotDB } from "@features/telegram/model/useTelegramCodeBotDB";
import { FooterModal } from "@widgets/Footer/FooterModal";
import { useAuth } from "@shared/lib/context/contexts";
import { useState } from "react";

export function Footer() {
  const { closeModal, isOpen, modalRef, openModal } = useModal();
  const [getKeyStatus, setGetKeyStatus] = useState<boolean>(false);
  const { user } = useAuth();
  const { code, clearCode, loading } = useTelegramCodeBotDB(
    user,
    getKeyStatus,
    setGetKeyStatus
  );

  function handleOpenModal() {
    setGetKeyStatus(true);
    openModal();
  }

  function handleCloseModal() {
    clearCode();
    closeModal();
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[var(--color-gray-50)] p-4 flex justify-between gap items-center max-h-18 z-10">
      <span className="text-[var(--color-gray-600)]">
        ©{new Date().getFullYear()} Dmitry Frolkov. All rights reserved.
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
