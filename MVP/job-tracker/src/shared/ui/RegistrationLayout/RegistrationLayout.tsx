import clsx from "clsx";
import type { RegistrationLayoutProps } from "./types";

export function RegistrationLayout({
  title,
  form,
  error,
  width,
}: RegistrationLayoutProps) {
  return (
    <div
      className={clsx(
        "flex grow items-center justify-center bg-[var(--color-gray-50)]",
        width < 1024 ? "pt-30 pb-30" : "",
      )}
    >
      <div className="flex flex-col gap-3 bg-[var(--color-white)] p-8 rounded-lg shadow-md w-full max-w-md">
        {title}
        <span className="text-[var(--color-danger)]">{error}</span>
        {form}
      </div>
    </div>
  );
}
