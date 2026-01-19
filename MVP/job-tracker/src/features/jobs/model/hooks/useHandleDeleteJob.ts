import { supabase } from "@shared/api/supabase/supabaseClient";
import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import type { JobDeleteProps } from "@features/jobs/model/types";
import { fetchTelegramApi } from "@/shared/api/telegram/tgApi";
import { toastNotifiactionView } from "@shared/ui/ToastNotification/getToastNotifiactionView";
import { useTranslation } from "react-i18next";

export function useHandleDeleteJob() {
  const { t } = useTranslation("notification");

  const langCurrent = localStorage.getItem("i18nextLng");

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
        toastNotifiactionView.success(t("notificationSuccessDeleted"));

        fetchTelegramApi(
          user.id,
          langCurrent === "en"
            ? `✅ Notification:\nThe vacancy was successfully deleted\nPosition: ${job.position}\nCompany: ${job.company}\nStatus: ${job.status}`
            : `✅ Уведомление:\nВакансия была успешно удалена\nПозиция: ${job.position}\nКомпания: ${job.company}\nСтатус: ${job.status}`
        );
      }
    } catch (err) {
      toastNotifiactionView.error(t("notificationErrorDeleted"));
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
