import { supabase } from "@/api/AppSupabaseClient";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type { DashboardFormResolverProps } from "@/components/Form/types";
import type { JobEditProps } from "./types";

export function useHandleEditJob() {
  async function handleSubmitEditFormDashboardHook(
    dataProps: DashboardFormResolverProps,
    jobEditProps: JobEditProps
  ) {
    const { position, company, status, notes } = dataProps;
    const {
      setJobs,
      setErrorDataBase,
      isOpenModal,
      setIsOpenModal,
      reset,
      arrayTagValue,
    } = jobEditProps;

    const backup = isOpenModal;

    if (!backup) return;

    setJobs((prev): KanbanProps[] => {
      return [...prev].map((job) =>
        job.id === isOpenModal?.id
          ? { ...job, position, company, status, notes, tags: arrayTagValue }
          : job
      );
    });

    try {
      const { data, error } = await supabase
        .from("jobs")
        .update({ position, company, status, notes, tags: arrayTagValue })
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

  return handleSubmitEditFormDashboardHook;
}
