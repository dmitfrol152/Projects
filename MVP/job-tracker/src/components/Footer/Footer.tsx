import { useModal } from "@/hooks/useModalManager/useModal";
import { ButtonUi } from "@/ui/ButtonUi";
import { Social } from "@components/Social";
import { useTelegramCodeBotDB } from "@/supabase/hooks/useTelegramCodeBotDB";
import { FooterModal } from "@components/Footer/FooterModal";
import { useUserDB } from "@/supabase/hooks/useUserDB";

export function Footer() {
  const { closeModal, isOpen, modalRef, openModal } = useModal();
  const { user } = useUserDB();
  const { code } = useTelegramCodeBotDB(user);

  function handleOpenModal() {
    openModal();
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[var(--color-gray-50)] p-4 flex justify-between gap items-center max-h-18 z-10">
      <span className="text-[var(--color-gray-600)]">
        ©2025 Dmitry Frolkov. All rights reserved.
      </span>
      <ButtonUi
        type="button"
        variant="tg"
        size="tg"
        handleClickButton={handleOpenModal}
      >
        @JobsTrackers_bot
      </ButtonUi>
      <Social />
      <FooterModal
        isOpen={isOpen}
        modalRef={modalRef}
        closeModal={closeModal}
        code={code}
      />
    </footer>
  );
}
