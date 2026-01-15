import { DashboardLayout } from "@pages/dashboard/ui";
import { DashboardParagraph } from "@features/dashboard/ui/DashboardParagraph";
import { DashboardTitle } from "@features/dashboard/ui/DashboardTitle";
import {
  DashboardFormResolverSchema,
  type DashboardFormResolverProps,
} from "@shared/ui/Form/types";
import { KanbanBoard } from "@features/kanban/KanbanBoard";
import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import { DashboardFormCustom } from "@features/dashboard/ui/DashboardForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardModal } from "@features/dashboard/ui/DashboardModal";
import { useJobManager } from "@features/jobs/model/useJobsManager";
import { useModalManager } from "@features/modalManager/model/useModalManager/useModalManager";
import { useFiltersColumns } from "@shared/lib/hooks/useFiltersColumns";
import { useFormatedJobsForExport } from "@features/jobs/model/hooks/useFormatedJobsForExport";
import { DashboardDescription } from "@features/dashboard/ui/DashboardDescription";
import { useState } from "react";
import { useWindowResize } from "@/shared/lib/hooks/useWindowResize";

export default function Dashboard() {
  const { width } = useWindowResize();
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
    user,
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
          user={user}
          widthWindow={width}
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
