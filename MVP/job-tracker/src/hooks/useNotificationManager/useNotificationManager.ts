import { useState, useEffect, useRef } from "react";
import type { NotificationFormResolverProps } from "@/components/Form/types";
import { getUniqueId } from "@/utils/getUniqueId";
import type { RemindersProps } from "@/components/NotificationLayout/Reminders/types";

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
          () => notifyMe(reminderParam),
          timeMs
        );
      }
    });

    return () => {
      Object.values(timerRef.current).forEach(clearTimeout);
    };
  }, [reminders]);

  function notifyMe(reminderParam: RemindersProps) {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Notification", { body: reminderParam.note });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            new Notification("Notification", { body: reminderParam.note });
          }
        });
      }
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
  };

  function deleteReminders(remindersId: string) {
    setReminders((prev) =>
      prev.filter((reminder) => reminder.id !== remindersId)
    );
  }

  return { reminders, addReminers, deleteReminders };
}
