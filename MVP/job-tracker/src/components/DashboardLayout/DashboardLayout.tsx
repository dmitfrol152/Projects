import type { DashboardLayoutProps } from "./types";

export function DashboardLayout({
  title,
  paragraph,
  kanban,
  formKanban,
  modal,
}: DashboardLayoutProps) {
  return (
    <>
      {title}
      {paragraph}
      <div className="flex flex-col gap-3 bg-[var(--color-white-modify)] p-8 rounded-lg shadow-md w-full min-h-62">
        {formKanban}
      </div>
      {kanban}
      {modal}
    </>
  );
}
