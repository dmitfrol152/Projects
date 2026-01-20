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
import { useTranslation } from "react-i18next";

export function useNotificationManager() {
  const [reminders, setReminders] = useState<RemindersProps[]>([]);
  const [userTelegramId, setUserTelegramId] = useState<string | null>(null);
  const { user } = useUserDB();
  const [loadingReminders, setLoadingReminders] = useState<boolean>(true);
  const { t } = useTranslation("notification");

  const langCurrent = localStorage.getItem("i18nextLng");

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
      toastNotifiactionView.error(t("notificationErrorAddReminder"));
      return;
    }

    toastNotifiactionView.success(t("notificationSuccessAddReminder"));

    if (user) {
      fetchTelegramApi(
        user.id,
        langCurrent === "en"
          ? `✅ Notification:\nThe reminder has been successfully added\nText: ${
              data.message
            }\nTime: ${new Date(data.date).toLocaleString()}`
          : `✅ Уведомление:\nНапоминание было успешно добавлено\nТекст: ${
              data.message
            }\nВремя: ${new Date(data.date).toLocaleString()}`,
      );
    }

    await fetchReminders();
  }

  async function deleteReminders(remindersId: string) {
    const response = await deleteRemindersDB(remindersId);
    if (!response.ok) {
      toastNotifiactionView.error(t("notificationErrorDeleteReminder"));
      return;
    }

    toastNotifiactionView.success(t("notificationSuccessDeleteReminder"));

    if (user) {
      fetchTelegramApi(
        user.id,
        langCurrent === "en"
          ? `✅ Notification:\nThe reminder has been successfully removed`
          : `✅ Уведомление:\nНапоминание было успешно удалено`,
      );
    }

    await fetchReminders();
  }

  async function deletePassedReminders() {
    const response = await deletePassedRemindersDB();
    if (!response.ok) {
      toastNotifiactionView.error(
        t("notificationErrorDeleteComplitedReminder"),
      );
      return;
    }

    toastNotifiactionView.success(
      t("notificationSuccessDeleteComplitedReminder"),
    );

    if (user) {
      fetchTelegramApi(
        user.id,
        langCurrent === "en"
          ? `✅ Notification:\nPast reminders have been successfully deleted`
          : `✅ Уведомление:\nПрошедшие напоминания были успешно удалены`,
      );
    }

    await fetchReminders();
  }

  async function deleteAllReminders() {
    const response = await deleteAllRemindersDB(user);
    if (!response.ok) {
      toastNotifiactionView.error(t("notificationErrorDeleteAllReminder"));
      return;
    }

    toastNotifiactionView.success(t("notificationSuccessDeleteAllReminder"));

    if (user) {
      fetchTelegramApi(
        user.id,
        langCurrent === "en"
          ? `✅ Notification:\nAll reminders have been successfully deleted`
          : `✅ Уведомление:\nВсе напоминания были успешно удалены`,
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
