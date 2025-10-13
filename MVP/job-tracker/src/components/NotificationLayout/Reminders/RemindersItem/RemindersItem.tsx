import { ButtonUi } from "@/ui/ButtonUi";
import type { ReminderProps } from "../types";
import IconDelete from "@assets/svg/icon-delete.svg?react";
import { useState } from "react";

export function RemindersItem({
  reminder,
  handleDeleteReminder,
}: ReminderProps) {
  const [hover, setHover] = useState<boolean | null>(null);

  return (
    <div
      className="flex justify-between border border-[var(--color-primary)] p-2 rounded"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className="flex flex-col gap">
        <span className="font-medium">{reminder.note}</span>
        <span className="text-sm text-[var(--color-gray-500)]">
          {new Date(reminder.time).toLocaleString()}
        </span>
      </div>
      {hover && (
        <ButtonUi
          className="text-[var(--color-danger)] hover:text-[var(--color-danger-hover)]"
          type="button"
          size="icon"
          variant="icon"
          handleClickButton={() => handleDeleteReminder(reminder.id)}
        >
          <IconDelete className="w-5 h-5" />
        </ButtonUi>
      )}
    </div>
  );
}
