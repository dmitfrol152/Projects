import type { NotificationLayoutProps } from "./types";

export function NotificationLayout({
  title,
  paragraph,
  form,
  reminders,
}: NotificationLayoutProps) {
  return (
    <div className="flex flex-col gap-3">
      {title}
      {paragraph}
      <div className="flex flex-col gap-3 bg-[var(--color-white-modify)] p-8 rounded-lg shadow-md w-full">
        {form}
      </div>
      {reminders}
    </div>
  );
}
