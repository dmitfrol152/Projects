import { useDebounce } from "@shared/lib/hooks/useDebounce";
import { useState, useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { VacanciesFormResolverProps } from "@shared/ui/Form/types";
import { updateJobsFiltersDB } from "@shared/api/supabase/jobs/updateJobsFiltersDB";
import { getJobsFiltersDB } from "@shared/api/supabase/jobs/getJobsFiltersDB";
import { useUserDB } from "@features/user/model/useUserDB";

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
    async function init() {
      if (!user) {
        // setIsInitialized(true);
        return;
      }

      try {
        const filtersInit = await getJobsFiltersDB(user);
        if (!filtersInit) throw new Error("Error get jobs_filters");

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

  useEffect(() => {
    async function initJobsFiltersDB() {
      if (!user) return;
      if (!isInitialized) return;

      await updateJobsFiltersDB(
        user.id,
        debounceQuery,
        salary,
        experience,
        orderBy,
        city
      );
    }

    initJobsFiltersDB();
  }, [city, debounceQuery, experience, isInitialized, orderBy, salary, user]);

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
