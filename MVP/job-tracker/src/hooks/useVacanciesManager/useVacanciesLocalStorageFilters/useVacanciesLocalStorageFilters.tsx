import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { VacanciesFormResolverProps } from "@/components/Form/types";
// import { getUserDB } from "@/supabase/utils/getUserDB";
import { updateJobsFiltersDB } from "@/supabase/utils/updateJobsFiltersDB";
// import { supabase } from "@/api/AppSupabaseClient";
import { getJobsFiltersDB } from "@/supabase/utils/getJobsFiltersDB";
import { useUserDB } from "@/supabase/hooks/useUserDB";

export function useVacanciesLocalStorageFilters(
  setValue?: UseFormSetValue<VacanciesFormResolverProps>
) {
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [perPages] = useState<number>(10);
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query, 1000);
  const [salary, setSalary] = useState<number | null>(null);
  const [experience, setExperience] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string | "">("");
  const [city, setCity] = useState<string | "">("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { user } = useUserDB();

  useEffect(() => {
    // const filtersInLocalStorage = localStorage.getItem("jobtracker:hh_filters");
    // if (filtersInLocalStorage) {
    //   try {
    //     const filtersParse = JSON.parse(filtersInLocalStorage);

    //     if (!filtersParse) {
    //       throw new Error("Error parse from LS");
    //     }

    //     if (filtersParse.query !== undefined) setQuery(filtersParse.query);
    //     if (filtersParse.salary !== undefined) setSalary(filtersParse.salary);
    //     if (filtersParse.experience !== undefined)
    //       setExperience(filtersParse.experience);
    //     if (filtersParse.orderBy !== undefined)
    //       setOrderBy(filtersParse.orderBy);
    //     if (filtersParse.city !== undefined) setCity(filtersParse.city);
    //     if (filtersParse.page !== undefined) setPage(filtersParse.page);
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }

    // setIsInitialized(true);

    async function init() {
      if (!user) {
        setIsInitialized(true);
        return;
      }

      try {
        const filtersInit = await getJobsFiltersDB(user);

        if (!filtersInit) throw new Error("Error get jobs_filters");

        console.log(filtersInit);

        if (filtersInit.query) setQuery(filtersInit.query);
        if (filtersInit.salary) setSalary(filtersInit.salary);
        if (filtersInit.experience) setExperience(filtersInit.experience);
        if (filtersInit.orderby) setOrderBy(filtersInit.orderby);
        if (filtersInit.city) setCity(filtersInit.city);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsInitialized(true);
      }
    }
    init();
  }, [user]);

  useEffect(() => {
    if (setValue && isInitialized) {
      setValue("salary", salary?.toString() || null);
      setValue("experience", experience);
      setValue("orderBy", orderBy);
      setValue("city", city);
    }
  }, [salary, experience, orderBy, city, setValue, isInitialized]);

  // useEffect(() => {
  //   if (!isInitialized) return;

  //   const dataToSave = {
  //     query: debounceQuery,
  //     salary,
  //     experience,
  //     orderBy,
  //     city,
  //     page,
  //   };

  //   localStorage.setItem("jobtracker:hh_filters", JSON.stringify(dataToSave));
  // }, [city, debounceQuery, experience, orderBy, page, salary, isInitialized]);

  useEffect(() => {
    async function initJobsFiltersDB() {
      // const user = await getUserDB();
      if (!user) return;

      await updateJobsFiltersDB(
        user.id,
        query,
        salary,
        experience,
        orderBy,
        city
      );
    }

    initJobsFiltersDB();
  }, [city, experience, orderBy, query, salary, user]);

  return {
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
    orderBy,
    setOrderBy,
    city,
    setCity,
  };
}
