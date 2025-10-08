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
    const newProfileId = getUniqueId();
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
        profile_id: newProfileId,
      },
    ]);

    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw new Error(
          "Error to add in DataBase new Job. Cannot find profile."
        );
      } else if (profileData) {
        const { data, error } = await supabase
          .from("jobs")
          .insert([
            {
              position,
              company,
              status,
              user_id: user.id,
              profile_id: profileData.id,
            },
          ])
          .select()
          .single();

        if (error) {
          throw new Error("Error to add in DataBase new Job");
        } else if (data) {
          setErrorDataBase(false);
          setJobs((prev: KanbanProps[]): KanbanProps[] => {
            return prev.map((job) => (job.id === newId ? data : job));
          });
        }
      }
    } catch (err) {
      setErrorDataBase(true);
      setJobs((prev): KanbanProps[] => prev.filter((job) => job.id !== newId));
      console.log(err);
    } finally {
      reset();
    }
  }

  return handleSubmitNewFormDashboardHook;
}
