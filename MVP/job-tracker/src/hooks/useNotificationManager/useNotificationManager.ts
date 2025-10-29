import { useState, useEffect, useRef } from "react";
import type { NotificationFormResolverProps } from "@/components/Form/types";
import { getUniqueId } from "@/utils/getUniqueId";
import type { RemindersProps } from "@/components/NotificationLayout/Reminders/types";
import { toastNotifiactionView } from "@/utils/getToastNotifiactionView";
import { fetchTelegramApi } from "@/api/telegramApi/telegramApi";
import { useUserDB } from "@/supabase/hooks/useUserDB";

export function useNotificationManager() {
  const [reminders, setReminders] = useState<RemindersProps[]>(() => {
    try {
      const data = localStorage.getItem("jobtracker:reminders");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const timerRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const { user } = useUserDB();

  useEffect(() => {
    localStorage.setItem("jobtracker:reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    Object.values(timerRef.current).forEach(clearTimeout);
    timerRef.current = {};

    reminders.forEach((reminderParam) => {
      const timeMs = new Date(reminderParam.time).getTime() - Date.now();
      if (timeMs > 0) {
        timerRef.current[reminderParam.id] = setTimeout(
          () => showToast(reminderParam, user?.id),
          timeMs
        );
      }
    });

    return () => {
      Object.values(timerRef.current).forEach(clearTimeout);
    };
  }, [reminders, user?.id]);

  function showToast(reminderParam: RemindersProps, userId?: string) {
    toastNotifiactionView.info(reminderParam.note);

    if (userId) {
      fetchTelegramApi(
        userId,
        `🔔 Notification:\nText: ${reminderParam.note}\nTime: ${new Date(
          reminderParam.time
        ).toLocaleString()}`
      );
    }
  }

  const addReminers = (data: NotificationFormResolverProps) => {
    const newIdReminers = getUniqueId();
    const newReminers: RemindersProps = {
      id: newIdReminers,
      note: data.message,
      time: data.date,
      created_at: new Date().toISOString(),
    };
    setReminders((prev) => [...prev, newReminers]);

    toastNotifiactionView.success("The reminder has been successfully added");

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nThe reminder has been successfully added\nText: ${
          data.message
        }\nTime: ${new Date(data.date).toLocaleString()}`
      );
    }
  };

  function deleteReminders(remindersId: string) {
    setReminders((prev) =>
      prev.filter((reminder) => reminder.id !== remindersId)
    );

    toastNotifiactionView.success("The reminder has been successfully removed");

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nThe reminder has been successfully removed`
      );
    }
  }

  function deletePassedReminders() {
    const result = reminders.find(
      (reminder) => new Date(reminder.time).getTime() < Date.now()
    );

    if (!result) return;

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nPast reminders have been successfully deleted`
      );
    }

    setReminders((prev) =>
      prev.filter((reminder) => new Date(reminder.time).getTime() > Date.now())
    );
  }

  function deleteAllReminders() {
    if (!reminders.length) return;

    if (user) {
      fetchTelegramApi(
        user.id,
        `✅ Notification:\nAll reminders have been successfully deleted`
      );
    }

    setReminders([]);
  }

  return {
    reminders,
    addReminers,
    deleteReminders,
    deletePassedReminders,
    deleteAllReminders,
  };
}
