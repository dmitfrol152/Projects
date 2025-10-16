import { KanbanColumn } from "@components/DashboardLayout/KanbanBoard/KanbanColumn";
import type { KanbanBoardProps, KanbanProps } from "./types";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { supabase } from "@/api/AppSupabaseClient";
import { ButtonUi } from "@/ui/ButtonUi";

export function KanbanBoard({
  jobs,
  setJobs,
  handleEditJob,
  handleDeleteJob,
  loading,
  columns,
  handleMoreJobs,
  visibleButtonMore,
}: KanbanBoardProps) {
  const onDragEnd = async (result: DropResult) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    // const originalJob = jobs.find((job) => job.id === draggableId);
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
    } catch (err) {
      console.log(err);

      setJobs((prev: KanbanProps[]): KanbanProps[] => {
        return prev.map((job) => (job.id === draggableId ? originalJob : job));
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col grow justify-between">
        <div
          className={`grid gap-3`}
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((column) => {
            // const jobsFiltred = jobs.filter((job) => job.status === column.key);
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
