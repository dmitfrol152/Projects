import { Draggable } from "@hello-pangea/dnd";
import { KanbanCard } from "@components/DashboardLayout/KanbanBoard/KanbanCard";
import type { KanbanColumnProps } from "./types";
import { SceletonsJobs } from "@/components/Sceletons";

export function KanbanColumn({
  title,
  jobs,
  handleEditJob,
  handleDeleteJob,
  loading,
}: KanbanColumnProps) {
  return (
    <div className="bg-[var(--color-gray-50)] rounded flex flex-col grow">
      <h2 className="font-bold mb-4">{title}</h2>
      <ul className="list-none flex flex-col gap-3 grow">
        {loading &&
          Array.from({ length: 3 }, (_, i) => <SceletonsJobs key={i} />)}
        {jobs.map((job, index) => {
          return (
            <Draggable key={job.id} draggableId={job.id} index={index}>
              {(provided) => {
                return (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <KanbanCard
                      job={job}
                      handleEditJob={handleEditJob}
                      handleDeleteJob={handleDeleteJob}
                    />
                  </li>
                );
              }}
            </Draggable>
          );
        })}
      </ul>
    </div>
  );
}
