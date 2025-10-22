import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardParagraph } from "@/components/DashboardLayout/DashboardParagraph";
import { DashboardTitle } from "@/components/DashboardLayout/DashboardTitle";
import {
  DashboardFormResolverSchema,
  type DashboardFormResolverProps,
} from "@/components/Form/types";
import { KanbanBoard } from "@/components/DashboardLayout/KanbanBoard";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { DashboardFormCustom } from "@/components/DashboardLayout/DashboardForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardModal } from "@/components/DashboardLayout/DashboardModal";
import { useJobManager } from "@/hooks/useJobsManager/useJobsManager";
import { useModalManager } from "@/hooks/useModalManager/useModalManager";
import { useFiltersColumns } from "@/hooks/useFiltersColumns/useFiltersColumns";
import { useFormatedJobsForExport } from "@/hooks/useFormatedJobsForExport";
import { DashboardDescription } from "@/components/DashboardLayout/DashboardDescription";
import { useState } from "react";

export default function Dashboard() {
  const [loadingAddOrEditJob, setLoadingAddOrEditJob] =
    useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<DashboardFormResolverProps>({
    resolver: zodResolver(DashboardFormResolverSchema),
    defaultValues: {
      position: "",
      company: "",
      status: "",
      notes: "",
    },
  });
  const {
    isOpenModal,
    setIsOpenModal,
    handleCloseModal,
    modalRef,
    handleEditJob,
    handleAddTag,
    handleDeleteTag,
    newTagValue,
    setNewTagValue,
    arrayTagValue,
    isErrorAddTag,
  } = useModalManager({ reset, setValue });
  const {
    handleDeleteJobHook,
    handleSubmitEditFormDashboardHook,
    handleSubmitNewFormDashboardHook,
    errorDataBase,
    loading,
    setJobs,
    groupedJobsByPage,
    valueSort,
    setValueSort,
    visibleButtonMore,
    setPage,
    popularTags,
    handleChangeStatusTags,
    groupedJobsWithoutPage,
  } = useJobManager();
  const {
    columns,
    isOpenFilters,
    handleOpenFilters,
    handleChangeStatusColumns,
    filtredColumnsJobs,
  } = useFiltersColumns();
  const { handleDownloadXlsx, handleDownloadCsv } = useFormatedJobsForExport(
    groupedJobsWithoutPage
  );

  async function handleSubmitNewFormDashboard(
    data: DashboardFormResolverProps
  ) {
    try {
      setLoadingAddOrEditJob(true);
      const result = await handleSubmitNewFormDashboardHook(data, { reset });
      return result;
    } finally {
      setLoadingAddOrEditJob(false);
    }
  }

  async function handleSubmitEditFormDashboard(
    data: DashboardFormResolverProps
  ) {
    try {
      setLoadingAddOrEditJob(true);
      const result = await handleSubmitEditFormDashboardHook(data, {
        reset,
        isOpenModal,
        setIsOpenModal,
        arrayTagValue,
      });
      return result;
    } finally {
      setLoadingAddOrEditJob(false);
    }
  }

  async function handleDeleteJob(data: KanbanProps) {
    return await handleDeleteJobHook(data);
  }

  function handleMoreJobs() {
    setPage((prev) => prev + 10);
  }

  return (
    <DashboardLayout
      title={<DashboardTitle />}
      paragraph={<DashboardParagraph />}
      formKanban={
        <DashboardFormCustom
          columns={columns}
          isOpenFilters={isOpenFilters}
          handleOpenFilters={handleOpenFilters}
          handleChangeStatusColumns={handleChangeStatusColumns}
          handleSubmit={handleSubmit}
          handleSubmitNewFormDashboard={handleSubmitNewFormDashboard}
          errorDataBase={errorDataBase}
          errors={errors}
          register={register}
          valueSort={valueSort}
          setValueSort={setValueSort}
          popularTags={popularTags}
          handleChangeStatusTags={handleChangeStatusTags}
          handleDownloadXlsx={handleDownloadXlsx}
          handleDownloadCsv={handleDownloadCsv}
        />
      }
      description={<DashboardDescription />}
      kanban={
        <KanbanBoard
          jobs={groupedJobsByPage}
          columns={filtredColumnsJobs}
          setJobs={setJobs}
          handleEditJob={handleEditJob}
          handleDeleteJob={handleDeleteJob}
          loading={loading}
          handleMoreJobs={handleMoreJobs}
          visibleButtonMore={visibleButtonMore}
        />
      }
      loadingAddOrEditJob={loadingAddOrEditJob}
      modal={
        <DashboardModal
          isOpenModal={isOpenModal}
          modalRef={modalRef}
          handleSubmit={handleSubmit}
          handleSubmitEditFormDashboard={handleSubmitEditFormDashboard}
          errors={errors}
          register={register}
          handleCloseModal={handleCloseModal}
          newTagValue={newTagValue}
          setNewTagValue={setNewTagValue}
          arrayTagValue={arrayTagValue}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
          isErrorAddTag={isErrorAddTag}
        />
      }
    />
  );
}
