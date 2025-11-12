import { supabase } from "@shared/api/supabase/supabaseClient";
import type { KanbanProps } from "@features/kanban/KanbanBoard/types";
import { useEffect, useState } from "react";
import { useAuth } from "@shared/lib/context/contexts";

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
