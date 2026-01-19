import { useTranslation } from "react-i18next";
import { RemindersItem } from "../RemindersItem";
import type { RemindersArrayProps } from "../types";

export function RemindersList({
  reminders,
  handleDeleteReminder,
  loadingReminders,
}: RemindersArrayProps) {
  const { t } = useTranslation("reminders");

  if (loadingReminders) return <p>{t("remindersLoading")}</p>;
  if (!reminders.length) return <p>{t("remindersEmpty")}</p>;

  return (
    <ul className="flex flex-col gap-3">
      {reminders.map((reminder) => (
        <li key={reminder.id}>
          <RemindersItem
            reminder={reminder}
            handleDeleteReminder={handleDeleteReminder}
          />
        </li>
      ))}
    </ul>
  );
}
