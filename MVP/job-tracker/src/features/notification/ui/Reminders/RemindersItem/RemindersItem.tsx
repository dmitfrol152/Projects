import { ButtonUi } from "@shared/ui/ButtonUi";
import type { ReminderProps } from "../types";
import IconDelete from "@shared/assets/svg/icon-delete.svg?react";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function RemindersItem({
  reminder,
  handleDeleteReminder,
}: ReminderProps) {
  const [hover, setHover] = useState<boolean | null>(null);
  const [passetNote, setPassetNote] = useState<boolean>(false);

  const currentTime = new Date(reminder.time).getTime() - Date.now();

  useEffect(() => {
    if (currentTime <= 0) {
      setPassetNote(true);
      return;
    }

    const timer = setTimeout(() => {
      setPassetNote(true);
    }, currentTime);

    return () => clearTimeout(timer);
  }, [currentTime]);

  return (
    <div
      className={clsx(
        "flex justify-between border p-2 rounded",
        !passetNote
          ? "border-[var(--color-primary)]"
          : "border-[var(--color-danger)]"
      )}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className="flex flex-col gap">
        <span className="font-medium">{reminder.note}</span>
        <span className="text-sm text-[var(--color-gray-500)]">
          {new Date(reminder.time).toLocaleString()}
        </span>
      </div>
      {passetNote ? (
        <span className="flex items-center font-bold text-[var(--color-danger)]">
          PASSED
        </span>
      ) : (
        <span className="flex items-center font-bold text-[var(--color-primary)]">
          SOON
        </span>
      )}
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
