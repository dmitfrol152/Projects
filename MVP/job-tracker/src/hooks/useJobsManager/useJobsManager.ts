import type { DashboardFormResolverProps } from "@/components/Form/types";
import { useSearch } from "../useContext";
import { getUniqueId } from "@/utils/getUniqueId";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { supabase } from "@/api/AppSupabaseClient";
import type { JobsManagerAddProps, JobsManagerEditProps } from "./types";
import { useEffect, useMemo, useState } from "react";
import { useInitialJobs } from "../useInitialJobs";

export function useJobManager() {
  const { jobs, setJobs, loading, user } = useInitialJobs();
  const { debounceValue } = useSearch();
  const [errorDataBase, setErrorDataBase] = useState<boolean>(false);
  const [valueSort, setValueSort] = useState<
    "" | "date" | "position" | "company" | "default"
  >("");
  const [page, setPage] = useState<number>(10);
  const [visibleButtonMore, setVisibleButtonMore] = useState<boolean | null>(
    null
  );

  async function handleSubmitNewFormDashboardHook(
    dataProps: DashboardFormResolverProps,
    jobsManagerProps: JobsManagerAddProps
  ) {
    if (!user) return;

    const { position, company, status } = dataProps;
    const { reset } = jobsManagerProps;

    const newId = getUniqueId();
    const newDate = new Date();
    setJobs((prev): KanbanProps[] => [
      ...prev,
      { id: newId, position, company, status, created_at: newDate },
    ]);

    try {
      const { data, error } = await supabase
        .from("jobs")
        .insert([{ position, company, status, user_id: user.id }])
        .select()
        .single();

      if (error) {
        setErrorDataBase(true);
        setJobs((prev): KanbanProps[] =>
          prev.filter((job) => job.id !== newId)
        );
        throw new Error("Error to add in DataBase new Job");
      } else if (data) {
        setErrorDataBase(false);
        setJobs((prev: KanbanProps[]): KanbanProps[] => {
          return prev.map((job) => (job.id === newId ? data : job));
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      reset();
    }
  }

  async function handleSubmitEditFormDashboardHook(
    dataProps: DashboardFormResolverProps,
    jobsManagerProps: JobsManagerEditProps
  ) {
    const { position, company, status } = dataProps;
    const { isOpenModal, setIsOpenModal, reset } = jobsManagerProps;

    const backup = isOpenModal;

    if (!backup) return;

    setJobs((prev): KanbanProps[] => {
      return [...prev].map((job) =>
        job.id === isOpenModal?.id ? { ...job, position, company, status } : job
      );
    });

    try {
      const { data, error } = await supabase
        .from("jobs")
        .update({ position, company, status })
        .eq("id", isOpenModal?.id)
        .select()
        .single();

      if (error) {
        setErrorDataBase(true);
        setJobs((prev): KanbanProps[] =>
          prev.map((job): KanbanProps => (job.id === backup.id ? backup : job))
        );
        throw new Error("Error edit Job in DataBase");
      } else if (data) {
        setErrorDataBase(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsOpenModal(null);
      reset();
    }
  }

  async function handleDeleteJobHook(job: KanbanProps) {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", job?.id);

      if (error) {
        setErrorDataBase(true);
        throw new Error("Error edit Job in DataBase");
      }

      setErrorDataBase(false);
      setJobs((prev): KanbanProps[] => {
        return [...prev].filter((jobPrev) => jobPrev.id !== job.id);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const filtredSearchJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        job.position.toLowerCase().includes(debounceValue) ||
        job.company.toLowerCase().includes(debounceValue)
      );
    });
  }, [debounceValue, jobs]);

  const sortedJobs = useMemo(() => {
    switch (valueSort) {
      case "company":
        return [...filtredSearchJobs].sort((a, b) =>
          a.company.localeCompare(b.company)
        );
      case "position":
        return [...filtredSearchJobs].sort((a, b) =>
          a.position.localeCompare(b.position)
        );
      case "date":
        return [...filtredSearchJobs].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "default":
        return filtredSearchJobs;
      default:
        return filtredSearchJobs;
    }
  }, [filtredSearchJobs, valueSort]);

  const groupedJobs = useMemo(() => {
    const mapGroupedJobs = new Map<string, KanbanProps[]>();

    for (const job of sortedJobs) {
      const key = job.status;
      if (!mapGroupedJobs.has(key)) mapGroupedJobs.set(key, []);
      mapGroupedJobs.get(key)?.push(job);
    }
    return mapGroupedJobs;
  }, [sortedJobs]);

  const groupedJobsByPage = useMemo(() => {
    const mapGroupedJobsByPage = new Map<string, KanbanProps[]>();
    for (const [status, jobs] of groupedJobs.entries()) {
      mapGroupedJobsByPage.set(status, jobs.slice(0, page));
    }
    return mapGroupedJobsByPage;
  }, [groupedJobs, page]);

  useEffect(() => {
    for (const arrayStatus of groupedJobs.values()) {
      if (arrayStatus.length > page) {
        setVisibleButtonMore(true);
        break;
      } else {
        setVisibleButtonMore(false);
      }
    }
  }, [groupedJobs, page]);

  return {
    handleSubmitNewFormDashboardHook,
    handleSubmitEditFormDashboardHook,
    handleDeleteJobHook,
    errorDataBase,
    setErrorDataBase,
    jobs,
    setJobs,
    loading,
    groupedJobsByPage,
    valueSort,
    setValueSort,
    visibleButtonMore,
    setPage,
  };
}
