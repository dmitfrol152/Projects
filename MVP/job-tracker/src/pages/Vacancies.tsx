import {
  VacanciesFormResolverSchema,
  type DashboardFormResolverProps,
  type VacanciesFormResolverProps,
} from "@/components/Form/types";
import { VacanciesLayout } from "@/components/VacanciesLayout";
import { VacanciesButtonTop } from "@/components/VacanciesLayout/VacanciesButtonTop/VacanciesButtonTop";
import type { DataScrollProps } from "@/components/VacanciesLayout/VacanciesDataList/VacanciesDataItem/types";
import { VacanciesDataList } from "@/components/VacanciesLayout/VacanciesDataList";
import { VacanciesEmpty } from "@/components/VacanciesLayout/VacanciesDataList/VacanciesEmpty";
import { VacanciesFetchError } from "@/components/VacanciesLayout/VacanciesFetchError";
import { VacanciesFormFilters } from "@/components/VacanciesLayout/VacanciesFormFilters";
import { VacanciesInput } from "@/components/VacanciesLayout/VacanciesInput";
import { VacanciesModal } from "@/components/VacanciesLayout/VacanciesModal";
import { VacanciesPagination } from "@/components/VacanciesLayout/VacanciesPagination";
import { VacanciesParagraph } from "@/components/VacanciesLayout/VacanciesParagraph";
import { VacanciesTitle } from "@/components/VacanciesLayout/VacanciesTitle";
import { useApiGetHeadHunterVacancies } from "@/hooks/useApi/useApiGetHeadHunterVacancies";
import { useJobManager } from "@/hooks/useJobsManager/useJobsManager";
import { useModal } from "@/hooks/useModalManager/useModal";
import { getWindowScrollTo } from "@/utils/getWindowScrollTo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useVacanciesLocalStorageFilters } from "@/hooks/useVacanciesManager/useVacanciesLocalStorageFilters/useVacanciesLocalStorageFilters";

export default function Vacancies() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<VacanciesFormResolverProps>({
    resolver: zodResolver(VacanciesFormResolverSchema),
    defaultValues: {
      salary: null,
      experience: "",
      orderBy: "",
      city: "",
    },
  });

  const {
    page,
    setPage,
    pages,
    setPages,
    perPages,
    query,
    setQuery,
    debounceQuery,
    salary,
    setSalary,
    experience,
    setExperience,
    city,
    setCity,
    orderBy,
    setOrderBy,
  } = useVacanciesLocalStorageFilters(setValue);

  const [isVisibleButtonTop, setIsVisibleButtonTop] = useState<boolean>(false);
  const [loadingAddJob, setLoadingAddJob] = useState<boolean>(false);

  const {
    data,
    isLoading,
    refetch,
    isError,
    isSuccess,
    paginationModel,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useApiGetHeadHunterVacancies(
    debounceQuery,
    page,
    perPages,
    salary,
    experience,
    orderBy,
    city
  );

  const {
    handleSubmitNewFormDashboardHook,
    errorDataBase,
    setErrorDataBase,
    successAddInKanban,
    setSuccessAddInKanban,
  } = useJobManager();

  const { closeModal, isOpen, modalRef, openModal } = useModal({
    callbackErr: setErrorDataBase,
    callbackSuccess: setSuccessAddInKanban,
  });

  useEffect(() => {
    if (errorDataBase || successAddInKanban) {
      openModal();
    }
  }, [errorDataBase, openModal, successAddInKanban]);

  useEffect(() => {
    if (data) {
      setPages(data.pages);
    }
  }, [data, setPages]);

  useEffect(() => {
    getWindowScrollTo();
  }, [debounceQuery]);

  useEffect(() => {
    if (paginationModel === "buttons" || !hasNextPage) return;

    function onScroll() {
      const heightWindow = window.innerHeight;
      const scrollYwindow = window.scrollY > heightWindow;

      setIsVisibleButtonTop(scrollYwindow);
    }

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [hasNextPage, paginationModel]);

  function handleRefetch() {
    refetch();
  }

  function handleClearSearchField() {
    setQuery("");
  }

  function handleBackPage() {
    getWindowScrollTo();
    setPage((prev) => Math.max(prev - 1, 0));
  }

  function handleNextPage() {
    getWindowScrollTo();
    setPage((prev) => prev + 1);
  }

  function handleClickTop() {
    getWindowScrollTo();
  }

  function handleToStartPage() {
    getWindowScrollTo();
    setPage(0);
  }

  function handleToEndPage() {
    getWindowScrollTo();
    setPage(pages - 1);
  }

  function getCurrentData() {
    return (
      (paginationModel === "buttons"
        ? data?.items
        : (data?.pages || []).flatMap(
            (p: DataScrollProps) => p?.items || []
          )) || []
    );
  }

  async function handleSubmitNewFormDashboard(
    data: DashboardFormResolverProps
  ) {
    try {
      setLoadingAddJob(true);
      const result = await handleSubmitNewFormDashboardHook(data);
      return result;
    } finally {
      setLoadingAddJob(false);
    }
  }

  function handleSubmitFilters(data: VacanciesFormResolverProps) {
    setSalary(data.salary ? Number(data.salary) : null);
    setExperience(data.experience || "");
    setOrderBy(data.orderBy || "");
    setCity(data.city || "");
    setPage(0);
  }

  function handleClearFilter() {
    setSalary(null);
    setExperience("");
    setOrderBy("");
    setCity("");
    setPage(0);
    reset();
    localStorage.removeItem("jobtracker:hh_filters");
  }

  const salaryEmpty = watch("salary");
  const experienceEmpty = watch("experience");
  const orderByEmpty = watch("orderBy");
  const cityEmpty = watch("city");
  const emptyValuesFilter =
    !salaryEmpty && !experienceEmpty && !orderByEmpty && !cityEmpty;

  console.log(data);

  const dataFound = data?.found || data?.pages[0].found || null;

  return (
    <VacanciesLayout
      title={<VacanciesTitle />}
      paragraph={<VacanciesParagraph />}
      input={
        <VacanciesInput
          query={query}
          setQuery={setQuery}
          handleClearSearchField={handleClearSearchField}
        />
      }
      formFilters={
        <VacanciesFormFilters
          handleSubmit={handleSubmit}
          handleSubmitFilters={handleSubmitFilters}
          handleClearFilter={handleClearFilter}
          errors={errors}
          register={register}
          emptyValuesFilter={emptyValuesFilter}
        />
      }
      loadingVacancies={isLoading}
      isError={!!isError}
      errorFecthVacancies={
        <VacanciesFetchError handleRefetch={handleRefetch} />
      }
      isSuccess={!!isSuccess}
      dataFound={dataFound}
      data={
        <VacanciesDataList
          dataList={getCurrentData()}
          handleSubmitNewFormDashboard={handleSubmitNewFormDashboard}
        />
      }
      pagination={
        <VacanciesPagination
          page={page}
          pages={pages}
          handleBackPage={handleBackPage}
          handleNextPage={handleNextPage}
          paginationModel={paginationModel}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          handleToStartPage={handleToStartPage}
          handleToEndPage={handleToEndPage}
        />
      }
      isEmpty={!query}
      emptyVacancies={<VacanciesEmpty />}
      buttonTop={<VacanciesButtonTop handleClickTop={handleClickTop} />}
      isVisibleButtonTop={isVisibleButtonTop}
      loadingAddJob={loadingAddJob}
      modal={
        <VacanciesModal
          isOpen={isOpen}
          modalRef={modalRef}
          closeModal={closeModal}
          setErrorDataBase={setErrorDataBase}
          errorDataBase={errorDataBase}
          setSuccessAddInKanban={setSuccessAddInKanban}
          successAddInKanban={successAddInKanban}
        />
      }
    />
  );
}
