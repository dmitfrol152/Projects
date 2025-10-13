import type { DashboardLayoutProps } from "./types";

export function DashboardLayout({
  title,
  paragraph,
  kanban,
  formKanban,
  description,
  modal,
}: DashboardLayoutProps) {
  return (
    <div className="flex flex-col gap-3">
      {title}
      {paragraph}
      <div className="flex flex-col gap-3 bg-[var(--color-white-modify)] p-8 rounded-lg shadow-md w-full min-h-62">
        {formKanban}
      </div>
      {description}
      {kanban}
      {modal}
    </div>
  );
}
