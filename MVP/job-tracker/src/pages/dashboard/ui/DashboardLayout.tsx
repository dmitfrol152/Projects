import { useTranslation } from "react-i18next";
import type { DashboardLayoutProps } from "./types";

export function DashboardLayout({
  title,
  paragraph,
  kanban,
  formKanban,
  description,
  loadingAddOrEditJob,
  modal,
}: DashboardLayoutProps) {
  const { t } = useTranslation("common");

  const loadingContainer = (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-100 bg-[var(--color-black-05)]">
      {t("loading")}
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {title}
      {paragraph}
      <div className="flex flex-col gap-3 bg-[var(--color-white-modify)] p-8 rounded-lg shadow-md w-full">
        {formKanban}
      </div>
      {description}
      {loadingAddOrEditJob ? loadingContainer : kanban}
      {modal}
    </div>
  );
}
