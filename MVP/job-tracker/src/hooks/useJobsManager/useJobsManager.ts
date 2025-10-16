import type { DashboardFormResolverProps } from "@/components/Form/types";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type {
  JobsManagerAddProps,
  JobsManagerEditProps,
  TagFiltersProps,
} from "./types";
import { useState } from "react";
import { useInitialJobs } from "@hooks/useInitialJobs";
import { useHandleNewJob } from "@hooks/useJobsManager/useHandleNewJob/useHandleNewJob";
import { useHandleEditJob } from "@hooks/useJobsManager/useHandleEditJob/useHandleEditJob";
import { useHandleDeleteJob } from "@hooks/useJobsManager/useHandleDeleteJob/useHandleDeleteJob";
import { useFiltersTagsStatus } from "@/hooks/useJobsManager/useFiltersTagsStatus/useFiltersTagsStatus";
import { useFiltersSearch } from "@/hooks/useJobsManager/useFiltersSearch/useFiltersSearch";
import { useFiltersTags } from "@/hooks/useJobsManager/useFiltersTags/useFiltersTags";
import { useFiltersSorted } from "@/hooks/useJobsManager/useFiltersSorted/useFiltersSorted";
import { useFiltersGroupedByPage } from "@/hooks/useJobsManager/useFiltersGroupedByPage/useFiltersGroupedByPage";

export function useJobManager() {
  const { jobs, setJobs, loading, user } = useInitialJobs();
  const [errorDataBase, setErrorDataBase] = useState<boolean>(false);
  const [successAddInKanban, setSuccessAddInKanban] = useState<boolean>(false);
  const submitNewJob = useHandleNewJob();
  const submitEditJob = useHandleEditJob();
  const submitDeleteJob = useHandleDeleteJob();
  const { tagsFilter, changeStatusTags } = useFiltersTagsStatus(jobs);
  const filtredSearchJobs = useFiltersSearch(jobs);
  const filtredByTagsJobs = useFiltersTags(tagsFilter, filtredSearchJobs);
  const { valueSort, setValueSort, sortedJobs } =
    useFiltersSorted(filtredByTagsJobs);
  const { groupedJobsByPage, visibleButtonMore, setPage } =
    useFiltersGroupedByPage(sortedJobs);

  async function handleSubmitNewFormDashboardHook(
    dataProps: DashboardFormResolverProps,
    jobsManagerProps?: JobsManagerAddProps
  ) {
    const reset = jobsManagerProps?.reset;

    await submitNewJob(dataProps, {
      user,
      setJobs,
      setErrorDataBase,
      setSuccessAddInKanban,
      reset,
    });
  }

  async function handleSubmitEditFormDashboardHook(
    dataProps: DashboardFormResolverProps,
    jobsManagerProps: JobsManagerEditProps
  ) {
    const { isOpenModal, setIsOpenModal, reset, arrayTagValue } =
      jobsManagerProps;

    await submitEditJob(dataProps, {
      setErrorDataBase,
      setJobs,
      isOpenModal,
      setIsOpenModal,
      reset,
      arrayTagValue,
    });
  }

  async function handleDeleteJobHook(job: KanbanProps) {
    await submitDeleteJob(job, { setErrorDataBase, setJobs });
  }

  function handleChangeStatusTags(obj: TagFiltersProps) {
    changeStatusTags(obj);
  }

  return {
    handleSubmitNewFormDashboardHook,
    handleSubmitEditFormDashboardHook,
    handleDeleteJobHook,
    errorDataBase,
    setErrorDataBase,
    successAddInKanban,
    setSuccessAddInKanban,
    jobs,
    setJobs,
    loading,
    groupedJobsByPage,
    groupedJobsWithoutPage: sortedJobs,
    valueSort,
    setValueSort,
    visibleButtonMore,
    setPage,
    popularTags: tagsFilter,
    handleChangeStatusTags,
  };
}
