import { supabase } from "@shared/api/supabase/supabaseClient";
import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import type { DashboardFormResolverProps } from "@shared/ui/Form/types";
import type { JobAddProps } from "@features/jobs/model/types";
import { fetchTelegramApi } from "@/shared/api/telegram/tgApi";
import { toastNotifiactionView } from "@shared/ui/ToastNotification/getToastNotifiactionView";

export function useHandleNewJob() {
  async function handleSubmitNewFormDashboardHook(
    dataProps: DashboardFormResolverProps,
    jobAddProps: JobAddProps
  ) {
    const { position, company, status, id, url } = dataProps;
    const { user, setJobs, setErrorDataBase, reset, setSuccessAddInKanban } =
      jobAddProps;

    if (!user) return;

    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw new Error(
          "Error to add in DataBase new Job. Cannot find profile"
        );
      } else if (profileData) {
        const { data: checkData, error: checkError } = await supabase
          .from("jobs")
          .select("id")
          .eq("user_id", user.id)
          .eq("position", position)
          .maybeSingle();

        if (checkData) {
          throw new Error("The job already exists");
        } else if (!checkError) {
          const { data, error } = await supabase
            .from("jobs")
            .insert([
              {
                position,
                company,
                status,
                user_id: user.id,
                profile_id: profileData.id,
                vacancy_id: id,
                vacancy_url: url,
              },
            ])
            .select()
            .single();

          if (error) {
            throw new Error("Error to add in DataBase new Job");
          } else if (data) {
            setSuccessAddInKanban(true);
            setErrorDataBase("");
            setJobs((prev: KanbanProps[]): KanbanProps[] => {
              return [...prev, data];
            });

            toastNotifiactionView.success("The vacancy was successfully added");

            fetchTelegramApi(
              user.id,
              `✅ Notification:\nThe vacancy was successfully added\nPosition: ${position}\nCompany: ${company}\nStatus: ${status}`
            );
          }
        }
      }
    } catch (err) {
      setSuccessAddInKanban(false);
      toastNotifiactionView.error("Error add vacancy");
      if (err instanceof Error) {
        setErrorDataBase(`${err.message}`);
      } else {
        throw err;
      }
      console.log(err);
    } finally {
      if (reset) {
        reset();
      }
    }
  }

  return handleSubmitNewFormDashboardHook;
}
