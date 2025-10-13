import { RemindersItem } from "../RemindersItem";
import type { RemindersArrayProps } from "../types";

export function RemindersList({
  reminders,
  handleDeleteReminder,
}: RemindersArrayProps) {
  if (!reminders.length) return <p>It's empty here for now</p>;

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
