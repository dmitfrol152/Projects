import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ModalManagerProps } from "./types";
import { useDebounce } from "../useDebounce";

export function useModalManager({ reset, setValue }: ModalManagerProps) {
  const [isOpenModal, setIsOpenModal] = useState<KanbanProps | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

    return job;
  }

  const handleCloseModal = useCallback(() => {
    setNewTagValue("");
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
    newTagValue,
    setNewTagValue,
    arrayTagValue,
    setArrayTagValue,
    handleAddTag,
    handleDeleteTag,
    isErrorAddTag,
  };
}
