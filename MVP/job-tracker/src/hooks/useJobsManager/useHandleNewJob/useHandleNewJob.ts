import { supabase } from "@/api/AppSupabaseClient";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type { DashboardFormResolverProps } from "@/components/Form/types";
import { getUniqueId } from "@/utils/getUniqueId";
import type { JobAddProps } from "./types";

export function useHandleNewJob() {
  async function handleSubmitNewFormDashboardHook(
    dataProps: DashboardFormResolverProps,
    jobAddProps: JobAddProps
  ) {
    const { position, company, status } = dataProps;
    const { user, setJobs, setErrorDataBase, reset } = jobAddProps;

    if (!user) return;

    const newId = getUniqueId();
    const newDate = new Date();
    setJobs((prev): KanbanProps[] => [
      ...prev,
      {
        id: newId,
        position,
        company,
        status,
        created_at: newDate,
        notes: "",
        tags: [],
      },
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

  return handleSubmitNewFormDashboardHook;
}
