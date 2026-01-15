import { KanbanColumn } from "@features/kanban/KanbanBoard/KanbanColumn";
import type { KanbanBoardProps, KanbanProps } from "./types";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { supabase } from "@shared/api/supabase/supabaseClient";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { fetchTelegramApi } from "@/shared/api/telegram/tgApi";
import clsx from "clsx";

export function KanbanBoard({
  jobs,
  setJobs,
  handleEditJob,
  handleDeleteJob,
  loading,
  columns,
  handleMoreJobs,
  visibleButtonMore,
  user,
  widthWindow,
}: KanbanBoardProps) {
  const onDragEnd = async (result: DropResult) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    let originalJob;

    for (const jobsInner of jobs.values()) {
      const finded = jobsInner.find((job) => job.id === draggableId);
      if (finded) {
        originalJob = finded;
        break;
      }
    }

    if (!originalJob) return;

    setJobs((prev: KanbanProps[]): KanbanProps[] => {
      return prev.map((job) =>
        job.id === draggableId
          ? { ...job, status: destination.droppableId as KanbanProps["status"] }
          : job
      );
    });

    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status: destination.droppableId })
        .eq("id", draggableId);

      if (error) {
        throw new Error("Error edit Job in DataBase");
      }

      if (user) {
        fetchTelegramApi(
          user.id,
          `✅ Notification:\nThe vacancy was successfully update\nPosition: ${originalJob.position}\nCompany: ${originalJob.company}\nStatus: ${destination.droppableId}`
        );
      }
    } catch (err) {
      console.log(err);

      setJobs((prev: KanbanProps[]): KanbanProps[] => {
        return prev.map((job) => (job.id === draggableId ? originalJob : job));
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col grow justify-between gap-4">
        <div
          className={clsx("grid gap-3")}
          style={{
            gridTemplateColumns:
              widthWindow > 768
                ? `repeat(${columns.length}, minmax(0, 1fr))`
                : "repeat(1, minmax(0, 1fr))",
          }}
        >
          {columns.map((column) => {
            const jobsFiltred = jobs.get(column.key);
            return (
              <Droppable droppableId={column.key} key={column.key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-col grow"
                    >
                      <KanbanColumn
                        title={column.title}
                        jobs={jobsFiltred || []}
                        handleEditJob={handleEditJob}
                        handleDeleteJob={handleDeleteJob}
                        loading={loading}
                      />
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
        {visibleButtonMore && (
          <div className="flex flex-col items-center">
            <ButtonUi
              type="button"
              size="md"
              variant="primary"
              handleClickButton={handleMoreJobs}
            >
              Load more
            </ButtonUi>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
