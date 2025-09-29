import type { LoginLayoutProps } from "./types";

export function LoginLayout({ title, form, error }: LoginLayoutProps) {
  return (
    <div className="flex grow items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-3 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {title}
        <span className="text-[var(--color-danger)]">{error}</span>
        {form}
      </div>
    </div>
  );
}
