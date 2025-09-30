import type { DashboardLayoutProps } from "./types";

export function DashboardLayout({
  title,
  paragraph,
  aside,
  kanban,
  formKanban,
  modal,
}: DashboardLayoutProps) {
  return (
    <div className="flex grow gap-3 bg-[var(--color-gray-light)]">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        {aside}
      </aside>
      <div className="container flex flex-col grow py-6">
        {title}
        {paragraph}
        <div className="flex flex-col gap-3 bg-white p-8 rounded-lg shadow-md w-full min-h-60">
          {formKanban}
        </div>
        {kanban}
        {modal}
      </div>
    </div>
  );
}
