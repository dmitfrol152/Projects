import { Button } from "@/ui/Button";
import type { KanbanCardProps } from "./types";
import IconEdit from "@assets/svg/icon-edit.svg?react";
import IconDelete from "@assets/svg/icon-delete.svg?react";
import { AnimatePresence, motion } from "framer-motion";

export function KanbanCard({
  job,
  handleEditJob,
  handleDeleteJob,
}: KanbanCardProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -20,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="bg-white rounded-lg shadow pt-4 pl-4 pb-4 pr-9 relative"
      >
        <h3 className="font-semibold">{job.position}</h3>
        <p className="text-sm text-gray-600">{job.company}</p>
        <Button
          className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          type="button"
          size="icon"
          variant="icon"
          handleClickButton={() => handleEditJob(job)}
        >
          <IconEdit className="w-5 h-5" />
        </Button>
        <Button
          className="absolute bottom-1 right-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)]"
          type="button"
          size="icon"
          variant="icon"
          handleClickButton={() => handleDeleteJob(job)}
        >
          <IconDelete className="w-5 h-5" />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
