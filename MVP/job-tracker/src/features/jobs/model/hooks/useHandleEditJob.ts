import { supabase } from "@shared/api/supabase/supabaseClient";
import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import type { DashboardFormResolverProps } from "@shared/ui/Form/types";
import type { JobEditProps } from "@features/jobs/model/types";
import { fetchTelegramApi } from "@/shared/api/telegram/tgApi";
import { toastNotifiactionView } from "@shared/ui/ToastNotification/getToastNotifiactionView";
import { useTranslation } from "react-i18next";

export function useHandleEditJob() {
  const { t } = useTranslation("notification");

  const langCurrent = localStorage.getItem("i18nextLng");

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
          toastNotifiactionView.success(t("notificationSuccessEdit"));

          fetchTelegramApi(
            user.id,
            langCurrent === "en"
              ? `✅ Notification:\nThe vacancy was successfully updated\nPosition: ${position}\nCompany: ${company}\nStatus: ${status}`
              : `✅ Уведомление:\nВакансия была успешно обновлена\nПозиция: ${position}\nКомпания: ${company}\nСтатус: ${status}`
          );
        }
      }
    } catch (err) {
      toastNotifiactionView.error(t("notificationErrorEdit"));
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
