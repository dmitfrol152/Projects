import { ButtonUi } from "@/ui/ButtonUi";
import type { KanbanCardProps } from "./types";
import IconEdit from "@assets/svg/icon-edit.svg?react";
import IconDelete from "@assets/svg/icon-delete.svg?react";
import { AnimatedContainer } from "@/shared/AnimatedContainer";
import { useState } from "react";

export function KanbanCard({
  job,
  handleEditJob,
  handleDeleteJob,
}: KanbanCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <AnimatedContainer
      setHover={setHover}
      className="bg-[var(--color-white-modify)] rounded-lg shadow pt-4 pl-4 pb-4 pr-9 relative"
    >
      <h3 className="font-semibold">{job.position}</h3>
      <p
        className={`text-sm text-[var(--color-gray-600)] ${
          job?.tags?.length > 0 ? "mb-3" : null
        }`}
      >
        {job.company}
      </p>
      <div className="flex gap-1">
        {job.tags &&
          job.tags.length > 0 &&
          job.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]"
            >
              {tag}
            </span>
          ))}
      </div>
      {hover && (
        <>
          <ButtonUi
            className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            type="button"
            size="icon"
            variant="icon"
            handleClickButton={() => handleEditJob(job)}
          >
            <IconEdit className="w-5 h-5" />
          </ButtonUi>
          <ButtonUi
            className="absolute bottom-1 right-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)]"
            type="button"
            size="icon"
            variant="icon"
            handleClickButton={() => handleDeleteJob(job)}
          >
            <IconDelete className="w-5 h-5" />
          </ButtonUi>
        </>
      )}
    </AnimatedContainer>
  );
}
