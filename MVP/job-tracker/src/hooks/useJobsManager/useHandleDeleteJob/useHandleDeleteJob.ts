import { supabase } from "@/api/AppSupabaseClient";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import type { JobDeleteProps } from "./types";
import { fetchTelegramApi } from "@/api/telegramApi/telegramApi";

export function useHandleDeleteJob() {
  async function handleDeleteJobHook(
    job: KanbanProps,
    jobDeleteProps: JobDeleteProps
  ) {
    const { setErrorDataBase, setJobs, user } = jobDeleteProps;

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", job?.id);

      if (error) {
        throw new Error("Error delete the Job in DataBase");
      }

      setErrorDataBase("");
      setJobs((prev): KanbanProps[] => {
        return [...prev].filter((jobPrev) => jobPrev.id !== job.id);
      });

      if (user) {
        fetchTelegramApi(
          user.id,
          `✅ Notification:\nThe vacancy was successfully deleted\nPosition: ${job.position}\nCompany: ${job.company}\nStatus: ${job.status}`
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorDataBase(`${err.message}`);
      } else {
        throw err;
      }
      console.log(err);
    }
  }

  return handleDeleteJobHook;
}
