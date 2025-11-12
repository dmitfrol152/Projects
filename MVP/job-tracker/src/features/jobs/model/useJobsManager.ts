import type { DashboardFormResolverProps } from "@shared/ui/Form/types";
import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import type {
  JobsManagerAddProps,
  JobsManagerEditProps,
  TagFiltersProps,
} from "./types";
import { useState } from "react";
import { useInitialJobs } from "@features/jobs/model/hooks/useInitialJobs";
import { useHandleNewJob } from "@features/jobs/model/hooks/useHandleNewJob";
import { useHandleEditJob } from "@features/jobs/model/hooks/useHandleEditJob";
import { useHandleDeleteJob } from "@features/jobs/model/hooks/useHandleDeleteJob";
import { useFiltersTagsStatus } from "@features/jobs/model/hooks/useFiltersTagsStatus";
import { useFiltersSearch } from "@features/jobs/model/hooks/useFiltersSearch";
import { useFiltersTags } from "@features/jobs/model/hooks/useFiltersTags";
import { useFiltersSorted } from "@features/jobs/model/hooks/useFiltersSorted";
import { useFiltersGroupedByPage } from "@features/jobs/model/hooks/useFiltersGroupedByPage";

export function useJobManager() {
  const { jobs, setJobs, loading, user } = useInitialJobs();
  const [errorDataBase, setErrorDataBase] = useState<string>("");
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
      user,
    });
  }

  async function handleDeleteJobHook(job: KanbanProps) {
    await submitDeleteJob(job, { setErrorDataBase, setJobs, user });
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
    user,
  };
}
