import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { VacanciesFormResolverProps } from "@/components/Form/types";

export function useVacanciesLocalStorageFilters(setValue?: UseFormSetValue<VacanciesFormResolverProps>) {
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

  useEffect(() => {
    const filtersInLocalStorage = localStorage.getItem("jobtracker:hh_filters");
    if (filtersInLocalStorage) {
      try {
        const filtersParse = JSON.parse(filtersInLocalStorage);

        if (!filtersParse) {
          throw new Error("Error parse from LS");
        }

        if (filtersParse.query !== undefined) setQuery(filtersParse.query);
        if (filtersParse.salary !== undefined) setSalary(filtersParse.salary);
        if (filtersParse.experience !== undefined)
          setExperience(filtersParse.experience);
        if (filtersParse.orderBy !== undefined)
          setOrderBy(filtersParse.orderBy);
        if (filtersParse.city !== undefined) setCity(filtersParse.city);
        if (filtersParse.page !== undefined) setPage(filtersParse.page);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (setValue && isInitialized) {
      setValue("salary", salary?.toString() || null);
      setValue("experience", experience);
      setValue("orderBy", orderBy);
      setValue("city", city);
    }
  }, [salary, experience, orderBy, city, setValue, isInitialized]);

  useEffect(() => {

    if (!isInitialized) return;
    
    const dataToSave = {
      query: debounceQuery,
      salary,
      experience,
      orderBy,
      city,
      page,
    };
    
    console.log("Сохранение в localStorage:", dataToSave);
    localStorage.setItem("jobtracker:hh_filters", JSON.stringify(dataToSave));
  }, [city, debounceQuery, experience, orderBy, page, salary, isInitialized]);

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
