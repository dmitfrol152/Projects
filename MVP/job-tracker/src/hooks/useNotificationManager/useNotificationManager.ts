import { useState, useEffect, useCallback } from "react";
import type { NotificationFormResolverProps } from "@/components/Form/types";
import type { RemindersProps } from "@/components/NotificationLayout/Reminders/types";
import { toastNotifiactionView } from "@/utils/getToastNotifiactionView";
import { fetchTelegramApi } from "@/api/telegramApi/telegramApi";
import { useUserDB } from "@/supabase/hooks/useUserDB";
import { getRemindersDB } from "@/supabase/utils/getRemindersDB";
import { addRemindersDB } from "@/supabase/utils/addRemindersDB";
import { deleteRemindersDB } from "@/supabase/utils/deleteRemindersDB";
import { deletePassedRemindersDB } from "@/supabase/utils/deletePassedRemindersDB";
import { deleteAllRemindersDB } from "@/supabase/utils/deleteAllRemindersDB";
import { getTelegramUserIdDB } from "@/supabase/utils/getTelegramUserIdDB";

export function useNotificationManager() {
  // const [reminders, setReminders] = useState<RemindersProps[]>(() => {
  //   try {
  //     const data = localStorage.getItem("jobtracker:reminders");
  //     return data ? JSON.parse(data) : [];
  //   } catch {
  //     return [];
  //   }
  // });
  const [reminders, setReminders] = useState<RemindersProps[]>([]);
  // const timerRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const [userTelegramId, setUserTelegramId] = useState<string | null>(null);
  const { user } = useUserDB();
  const [loadingReminders, setLoadingReminders] = useState<boolean>(true);
  // const userTelegramId = getTelegramUserIdDB(user?.id ?? "");

  // useEffect(() => {
  //   localStorage.setItem("jobtracker:reminders", JSON.stringify(reminders));
  // }, [reminders]);

  const fetchReminders = useCallback(async () => {
    if (!user) return;

    const data = await getRemindersDB(user);
    setLoadingReminders(false);

    setReminders(data ?? []);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchReminders();
  }, [fetchReminders, user]);

  useEffect(() => {
    if (!user?.id) return;
    const userId = user.id;
    async function getTelegramId() {
      const result = await getTelegramUserIdDB(userId);
      setUserTelegramId(result);
    }

    getTelegramId();
  }, [user?.id]);

  // useEffect(() => {
  //   Object.values(timerRef.current).forEach(clearTimeout);
  //   timerRef.current = {};

  //   reminders.forEach((reminderParam) => {
  //     const timeMs = new Date(reminderParam.time).getTime() - Date.now();
  //     if (timeMs > 0) {
  //       timerRef.current[reminderParam.id] = setTimeout(
  //         () => showToast(reminderParam, user?.id),
  //         timeMs
  //       );
  //     }
  //   });

  //   return () => {
  //     Object.values(timerRef.current).forEach(clearTimeout);
  //   };
  // }, [reminders, user?.id]);

  // function showToast(reminderParam: RemindersProps, userId?: string) {
  //   toastNotifiactionView.info(reminderParam.note);

  //   if (userId) {
  //     fetchTelegramApi(
  //       userId,
  //       `🔔 Notification:\nText: ${reminderParam.note}\nTime: ${new Date(
  //         reminderParam.time
  //       ).toLocaleString()}`
  //     );
  //   }
  // }

  async function addReminers(data: NotificationFormResolverProps) {
    // const newIdReminers = getUniqueId();
    // const newReminers: RemindersProps = {
    //   id: newIdReminers,
    //   note: data.message,
    //   time: data.date,
    //   created_at: new Date().toISOString(),
    // };
    // setReminders((prev) => [...prev, newReminers]);
    const response = await addRemindersDB(data, user, userTelegramId);
    if (!response.ok) {
      toastNotifiactionView.error("Error saving reminder");
      return;
    }

    toastNotifiactionView.success("The reminder has been successfully added");

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nThe reminder has been successfully added\nText: ${
          data.message
        }\nTime: ${new Date(data.date).toLocaleString()}`
      );
    }

    await fetchReminders();
  }

  async function deleteReminders(remindersId: string) {
    // setReminders((prev) =>
    //   prev.filter((reminder) => reminder.id !== remindersId)
    // );
    const response = await deleteRemindersDB(remindersId);
    if (!response.ok) {
      toastNotifiactionView.error("Error deleting reminder");
      return;
    }

    toastNotifiactionView.success("The reminder has been successfully removed");

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nThe reminder has been successfully removed`
      );
    }

    await fetchReminders();
  }

  async function deletePassedReminders() {
    // const result = reminders.find(
    //   (reminder) => new Date(reminder.time).getTime() < Date.now()
    // );

    // if (!result) return;
    const response = await deletePassedRemindersDB();
    if (!response.ok) {
      toastNotifiactionView.error("Error deleting completed reminders");
      return;
    }

    toastNotifiactionView.success(
      "The passed reminder has been successfully removed"
    );

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nPast reminders have been successfully deleted`
      );
    }

    // setReminders((prev) =>
    //   prev.filter((reminder) => new Date(reminder.time).getTime() > Date.now())
    // );

    await fetchReminders();
  }

  async function deleteAllReminders() {
    // if (!reminders.length) return;
    const response = await deleteAllRemindersDB(user);
    if (!response.ok) {
      toastNotifiactionView.error("Error deleting all reminders");
      return;
    }

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nAll reminders have been successfully deleted`
      );
    }

    // setReminders([]);

    await fetchReminders();
  }

  return {
    reminders,
    addReminers,
    deleteReminders,
    deletePassedReminders,
    deleteAllReminders,
    loadingReminders,
  };
}
