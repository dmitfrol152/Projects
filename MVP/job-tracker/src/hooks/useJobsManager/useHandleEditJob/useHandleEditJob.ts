import { supabase } from "@/api/AppSupabaseClient";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type { DashboardFormResolverProps } from "@/components/Form/types";
import type { JobEditProps } from "./types";
import { fetchTelegramApi } from "@/api/telegramApi/telegramApi";

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
      user,
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
        throw new Error("Error to edit in DataBase the Job");
      } else if (data) {
        setErrorDataBase("");

        if (user) {
          fetchTelegramApi(
            user.id,
            `✅ Notification:\nThe vacancy was successfully updated\nPosition: ${position}\nCompany: ${company}\nStatus: ${status}`
          );
        }
      }
    } catch (err) {
      setJobs((prev): KanbanProps[] =>
        prev.map((job): KanbanProps => (job.id === backup.id ? backup : job))
      );
      if (err instanceof Error) {
        setErrorDataBase(`${err.message}`);
      } else {
        throw err;
      }
      console.log(err);
    } finally {
      setIsOpenModal(null);
      reset();
    }
  }

  return handleSubmitEditFormDashboardHook;
}
