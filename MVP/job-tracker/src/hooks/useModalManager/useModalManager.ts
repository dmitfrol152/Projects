import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ModalManagerProps } from "./types";

export function useModalManager({ reset, setValue }: ModalManagerProps) {
  const [isOpenModal, setIsOpenModal] = useState<KanbanProps | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleEditJob(job: KanbanProps) {
    setIsOpenModal(job);
    setValue("position", job.position);
    setValue("company", job.company);
    setValue("status", job.status);
  }

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(null);
    reset();
  }, [reset]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        handleCloseModal();
      }
    };

    if (isOpenModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleCloseModal, isOpenModal]);

  return {
    handleCloseModal,
    isOpenModal,
    setIsOpenModal,
    modalRef,
    handleEditJob,
  };
}
