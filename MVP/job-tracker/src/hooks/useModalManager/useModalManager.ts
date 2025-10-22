import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useCallback, useEffect, useState } from "react";
import type { ModalManagerProps } from "./types";
import { useDebounce } from "@hooks/useDebounce";
import { useModal } from "@/hooks/useModalManager/useModal/useModal";

export function useModalManager({ reset, setValue }: ModalManagerProps) {
  const [isOpenModal, setIsOpenModal] = useState<KanbanProps | null>(null);
  const { modalRef, openModal, closeModal, isOpen } = useModal({ reset });

  const [newTagValue, setNewTagValue] = useState<string>("");
  const [arrayTagValue, setArrayTagValue] = useState<string[]>([]);
  const [isErrorAddTag, setIsErrorAddTag] = useState<boolean>(false);
  const debounceValue = useDebounce(newTagValue, 300);

  useEffect(() => {
    setIsErrorAddTag(false);
  }, [debounceValue]);

  async function handleAddTag() {
    const trimTagValue = newTagValue.trim().toLowerCase();
    if (!trimTagValue || !isOpenModal) return;
    if (arrayTagValue.length >= 3) {
      setIsErrorAddTag(true);
      return;
    } else {
      setIsErrorAddTag(false);
    }

    setArrayTagValue((prev) => {
      return prev.some((tag) => tag.toLowerCase() === trimTagValue)
        ? prev
        : [...prev, trimTagValue];
    });
    setNewTagValue("");
  }

  async function handleDeleteTag(tagName: string) {
    setArrayTagValue((prev) => {
      return prev.filter((tagFilter) => tagFilter !== tagName);
    });
  }

  function handleEditJob(job: KanbanProps) {
    setIsOpenModal(job);
    setArrayTagValue(job?.tags || []);
    setValue("position", job.position);
    setValue("company", job.company);
    setValue("status", job.status);
    setValue("notes", job.notes);
    openModal();

    return job;
  }

  useEffect(() => {
    if (!isOpen) {
      setIsOpenModal(null);
    }
  }, [isOpen]);

  const handleCloseModal = useCallback(() => {
    setNewTagValue("");
    setIsOpenModal(null);
    reset();
    closeModal();
  }, [closeModal, reset]);

  return {
    handleCloseModal,
    isOpenModal,
    setIsOpenModal,
    modalRef,
    isOpen,
    handleEditJob,
    newTagValue,
    setNewTagValue,
    arrayTagValue,
    setArrayTagValue,
    handleAddTag,
    handleDeleteTag,
    isErrorAddTag,
  };
}
