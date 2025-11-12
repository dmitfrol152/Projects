import { useState, useEffect, useCallback } from "react";
import type { NotificationFormResolverProps } from "@shared/ui/Form/types";
import type { RemindersProps } from "@features/notification/ui/Reminders/types";
import { toastNotifiactionView } from "@shared/ui/ToastNotification/getToastNotifiactionView";
import { fetchTelegramApi } from "@/shared/api/telegram/tgApi";
import { useUserDB } from "@features/user/model/useUserDB";
import { getRemindersDB } from "@shared/api/supabase/reminders/getRemindersDB";
import { addRemindersDB } from "@shared/api/supabase/reminders/addRemindersDB";
import { deleteRemindersDB } from "@shared/api/supabase/reminders/deleteRemindersDB";
import { deletePassedRemindersDB } from "@shared/api/supabase/reminders/deletePassedRemindersDB";
import { deleteAllRemindersDB } from "@shared/api/supabase/reminders/deleteAllRemindersDB";
import { getTelegramUserIdDB } from "@shared/api/supabase/telegram/getTelegramUserIdDB";

export function useNotificationManager() {
  const [reminders, setReminders] = useState<RemindersProps[]>([]);
  const [userTelegramId, setUserTelegramId] = useState<string | null>(null);
  const { user } = useUserDB();
  const [loadingReminders, setLoadingReminders] = useState<boolean>(true);

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

  async function addReminers(data: NotificationFormResolverProps) {
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

    await fetchReminders();
  }

  async function deleteAllReminders() {
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
