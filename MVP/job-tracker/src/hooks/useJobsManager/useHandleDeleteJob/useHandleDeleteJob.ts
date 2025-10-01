import { supabase } from "@/api/AppSupabaseClient";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type { JobDeleteProps } from "./types";

export function useHandleDeleteJob() {
  async function handleDeleteJobHook(
    job: KanbanProps,
    jobDeleteProps: JobDeleteProps
  ) {
    const { setErrorDataBase, setJobs } = jobDeleteProps;

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

  return handleDeleteJobHook;
}
