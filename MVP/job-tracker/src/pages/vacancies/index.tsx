import {
  VacanciesFormResolverSchema,
  type DashboardFormResolverProps,
  type VacanciesFormResolverProps,
} from "@shared/ui/Form/types";
import { VacanciesLayout } from "@pages/vacancies/ui";
import { VacanciesButtonTop } from "@features/vacancies/ui/VacanciesButtonTop/VacanciesButtonTop";
import type { DataScrollProps } from "@features/vacancies/ui/VacanciesDataList/VacanciesDataItem/types";
import { VacanciesDataList } from "@features/vacancies/ui/VacanciesDataList";
import { VacanciesEmpty } from "@features/vacancies/ui/VacanciesDataList/VacanciesEmpty";
import { VacanciesFetchError } from "@features/vacancies/ui/VacanciesFetchError";
import { VacanciesFormFilters } from "@features/vacancies/ui/VacanciesFormFilters";
import { VacanciesInput } from "@features/vacancies/ui/VacanciesInput";
import { VacanciesModal } from "@features/vacancies/ui/VacanciesModal";
import { VacanciesPagination } from "@features/vacancies/ui/VacanciesPagination";
import { VacanciesParagraph } from "@features/vacancies/ui/VacanciesParagraph";
import { VacanciesTitle } from "@features/vacancies/ui/VacanciesTitle";
import { useApiGetHeadHunterVacancies } from "@pages/vacancies/model/useApiGetHeadHunterVacancies";
import { useJobManager } from "@features/jobs/model/useJobsManager";
import { useModal } from "@shared/lib/hooks/useModal";
import { getWindowScrollTo } from "@shared/lib/utils/getWindowScrollTo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useVacanciesLocalStorageFilters } from "@features/initSearchFilters/model/useVacanciesLocalStorageFilters";

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
