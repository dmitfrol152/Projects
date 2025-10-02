import { supabase } from "@/api/AppSupabaseClient";
import type { KanbanProps } from "@/components/DashboardLayout/KanbanBoard/types";
import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useContext";

export function useInitialJobs() {
  const [jobs, setJobs] = useState<KanbanProps[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadJobs = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        throw new Error("Error get from DataBase");
      }

      setLoading(false);
      setJobs(data || []);
    };

    try {
      loadJobs();
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  return {
    jobs,
    setJobs,
    loading,
    user,
  };
}
